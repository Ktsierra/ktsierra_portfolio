/*
 * The <JS/> exhibit renderer. Lazy-loaded: nothing here ships in the initial bundle.
 *
 * Plain three.js rather than @react-three/fiber: R3F imports all of three (no tree shaking),
 * which put the chunk at ~270 KB gz against a 250 KB budget. This one is ~165 KB gz.
 */
import {
  ACESFilmicToneMapping,
  Box3,
  type BufferGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

export type ExhibitMaterial = 'paper' | 'graphite' | 'signal';

export interface ViewerOptions {
  container: HTMLElement;
  modelUrl: string;
  material: ExhibitMaterial;
  reducedMotion: boolean;
  /** Allow software rendering (SwiftShader, llvmpipe). Off by default: those devices keep the poster. */
  allowSoftware: boolean;
  /** Called after the first frame with the model on screen */
  onReady: () => void;
  onError: (err: unknown) => void;
}

export interface Viewer {
  setActive: (active: boolean) => void;
  setMaterial: (material: ExhibitMaterial) => void;
  dispose: () => void;
}

const MATERIALS: Record<ExhibitMaterial, { color: string; roughness: number }> = {
  paper: { color: '#E9ECE8', roughness: 0.55 },
  graphite: { color: '#2A2F36', roughness: 0.45 },
  signal: { color: '#FF5A1F', roughness: 0.5 },
};

const REST_YAW = MathUtils.degToRad(-24);
const REST_PITCH = MathUtils.degToRad(10);
const IDLE_SWING = MathUtils.degToRad(35);
const IDLE_PERIOD = 8; // seconds per full cycle
const PITCH_LIMIT = MathUtils.degToRad(15);
// Stop short of edge-on so the mirrored back face never faces the camera
const YAW_LIMIT = MathUtils.degToRad(80);
const RESUME_AFTER = 3; // seconds after release before the idle swing takes over again
const DAMPING = 6; // higher is snappier
const DRAG_SPEED = 0.008; // radians per CSS pixel
// Share of the viewport width the model fills, matching the poster in the design. The brief's
// fixed 3.1r distance left it at ~52% in the 5:4 figure; this keeps the poster's framing at any aspect.
const FILL = 0.66;
const MIN_DISTANCE = 2.2; // in model radii, so a tall phone viewport never crops it

// Chrome reports SwiftShader-on-Vulkan without the performance caveat, so check the name too
const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|microsoft basic render/i;
const isSoftwareRenderer = (renderer: WebGLRenderer) => {
  const gl = renderer.getContext();
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
  return SOFTWARE.test(name);
};

export const createViewer = (opts: ViewerOptions): Viewer => {
  const { container, reducedMotion } = opts;

  // failIfMajorPerformanceCaveat: no GPU means no live model. A software rasterizer would spend the
  // main thread on every frame; the caller catches the throw and the poster stays.
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: !opts.allowSoftware,
  });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  if (!opts.allowSoftware && isSoftwareRenderer(renderer)) {
    renderer.dispose();
    throw new Error('Software WebGL renderer');
  }
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
  container.appendChild(canvas);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envMap;
  scene.environmentIntensity = 0.35;

  const camera = new PerspectiveCamera(22, 1, 0.001, 100);
  const pivot = new Group();
  scene.add(pivot);

  let yaw = REST_YAW;
  let pitch = REST_PITCH;
  let dragYaw = REST_YAW;
  let dragPitch = REST_PITCH;
  let dragging = false;
  let releasedAt = -Infinity;
  let active = false;
  let loaded = false;
  let ready = false;
  let frame = 0;
  let last = 0;
  let clock = 0;
  let disposed = false;
  let radius = 0;
  let current = opts.material;
  const material = new MeshStandardMaterial({ metalness: 0, side: DoubleSide });

  const frameModel = () => {
    if (!radius) return;
    const halfFov = MathUtils.degToRad(camera.fov / 2);
    const fit = radius / (FILL * 2 * Math.tan(halfFov) * camera.aspect);
    camera.position.set(0, 0, Math.max(fit, MIN_DISTANCE * radius));
    camera.lookAt(0, 0, 0);
  };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    // Cap the backing store on phones; the exhibit is small there
    const cap = w < 600 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    frameModel();
    wake();
  };

  const target = () => {
    const holding = dragging || clock - releasedAt < RESUME_AFTER;
    if (holding) return { y: dragYaw, p: dragPitch };
    if (reducedMotion) return { y: REST_YAW, p: REST_PITCH };
    return { y: REST_YAW + IDLE_SWING * Math.sin((clock / IDLE_PERIOD) * Math.PI * 2), p: REST_PITCH };
  };

  const tick = (now: number) => {
    frame = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    clock += dt;

    const t = target();
    const k = 1 - Math.exp(-DAMPING * dt);
    yaw += (t.y - yaw) * k;
    pitch += (t.p - pitch) * k;
    pivot.rotation.set(pitch, yaw, 0);
    renderer.render(scene, camera);

    if (loaded && !ready) {
      ready = true;
      opts.onReady();
    }

    const settled = Math.abs(t.y - yaw) < 1e-4 && Math.abs(t.p - pitch) < 1e-4;
    const holding = dragging || clock - releasedAt < RESUME_AFTER;
    // Keep rendering while there is motion to show; otherwise sleep until woken
    if (active && (!reducedMotion || holding || !settled)) frame = requestAnimationFrame(tick);
  };

  function wake() {
    if (!active || frame || disposed) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  }

  // Drag: horizontal rotates yaw, vertical nudges pitch within ±15°. touch-action: pan-y leaves
  // vertical swipes to the browser, which sends pointercancel when it takes over the scroll.
  let startX = 0;
  let startY = 0;
  let startYaw = 0;
  let startPitch = 0;
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startYaw = yaw;
    startPitch = pitch;
    dragYaw = yaw;
    dragPitch = pitch;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
    wake();
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    dragYaw = MathUtils.clamp(startYaw + (e.clientX - startX) * DRAG_SPEED, REST_YAW - YAW_LIMIT, REST_YAW + YAW_LIMIT);
    dragPitch = MathUtils.clamp(startPitch + (e.clientY - startY) * DRAG_SPEED, REST_PITCH - PITCH_LIMIT, REST_PITCH + PITCH_LIMIT);
    wake();
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    releasedAt = clock;
    canvas.style.cursor = 'grab';
    wake();
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('lostpointercapture', onUp);

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(
    opts.modelUrl,
    (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      material.color.set(MATERIALS[current].color);
      material.roughness = MATERIALS[current].roughness;
      model.traverse((o: Object3D) => {
        // The export carries the curve outline as a line primitive: hide it, keep the solid
        if ('isLine' in o || 'isLineSegments' in o || 'isPoints' in o) o.visible = false;
        if (o instanceof Mesh) o.material = material;
      });

      const box = new Box3().setFromObject(model);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      model.position.sub(center);
      pivot.add(model);

      const r = Math.max(size.x, size.y, size.z);
      radius = r;
      frameModel();
      camera.near = r / 100;
      camera.far = r * 20;
      camera.updateProjectionMatrix();

      const key = new DirectionalLight('#ffffff', 2.6);
      key.position.set(-r, 1.2 * r, 2 * r);
      const rim = new DirectionalLight('#FF5A1F', 3.2);
      rim.position.set(2 * r, 0.3 * r, -1.5 * r);
      const fill = new DirectionalLight('#9AB4C8', 0.6);
      fill.position.set(1.5 * r, -r, r);
      scene.add(key, rim, fill);

      loaded = true;
      wake();
    },
    undefined,
    (err) => { if (!disposed) opts.onError(err); },
  );

  return {
    setMaterial: (next) => {
      current = next;
      material.color.set(MATERIALS[next].color);
      material.roughness = MATERIALS[next].roughness;
      if (frame) return;
      // Redraw once even when the loop is asleep (reduced motion, settled)
      last = 0;
      frame = requestAnimationFrame(tick);
    },
    setActive: (next) => {
      active = next;
      if (active) wake();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    dispose: () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      canvas.removeEventListener('lostpointercapture', onUp);
      scene.traverse((o) => {
        if (o instanceof Mesh) {
          const mesh = o as Mesh<BufferGeometry, MeshStandardMaterial>;
          mesh.geometry.dispose();
          mesh.material.dispose();
        }
      });
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
};
