import { useEffect, useRef, useState } from 'react';
import { site } from '../../content/site';
import type { ExhibitMaterial, Viewer } from './viewer';
import { useInView } from '../../hooks/useInView';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const RotateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

const Corner = ({ pos }: { pos: string }) => (
  <span aria-hidden="true" className={`absolute z-10 size-[18px] border-signal ${pos}`} />
);

/** Runs the callback once the browser is idle (or after a timeout where requestIdleCallback is missing) */
const whenIdle = (cb: () => void) => {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(cb, { timeout: 2500 });
    return () => { window.cancelIdleCallback(id); };
  }
  const id = setTimeout(cb, 1200);
  return () => { clearTimeout(id); };
};

/**
 * Fig. 0: the dark viewport with the <JS/> model. Shows the poster immediately; once the page
 * is idle and the figure is on screen it lazy-loads the three.js viewer and crossfades to it.
 * Without WebGL, or on any failure, the poster simply stays.
 */
interface Props {
  material: ExhibitMaterial;
  /** Fires once the live model has replaced the poster */
  onLive?: () => void;
}

/** Graphite reads on a light viewport (as in the looks board); paper and signal on the dark one */
const skins = {
  dark: { figure: 'bg-ink', text: 'text-muted-dark', ring: 'border-line-2' },
  light: { figure: 'bg-panel', text: 'text-muted', ring: 'border-plate-rule' },
};

const JsExhibit = ({ material, onLive }: Props) => {
  const { exhibit } = site;
  const [figRef, seen] = useInView<HTMLElement>('0px');
  const stageRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer>(undefined);
  const initialMaterial = useRef(material);
  const onLiveRef = useRef(onLive);
  const [live, setLive] = useState(false);
  const skin = skins[material === 'graphite' ? 'light' : 'dark'];

  useEffect(() => { onLiveRef.current = onLive; }, [onLive]);
  useEffect(() => { viewerRef.current?.setMaterial(material); }, [material]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!seen || !stage) return;

    let viewer: Viewer | undefined;
    let cancelled = false;
    let onScreen = true;
    const sync = () => viewer?.setActive(onScreen && document.visibilityState === 'visible');

    // Pause when scrolled away or when the tab is hidden
    const io = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(stage);
    document.addEventListener('visibilitychange', sync);

    const cancelIdle = whenIdle(() => {
      void import('./viewer')
        .then(({ createViewer }) => {
          if (cancelled) return;
          viewer = createViewer({
            container: stage,
            modelUrl: asset(exhibit.model),
            material: initialMaterial.current,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            // ?force3d renders the model even without a GPU, for testing on such machines
            allowSoftware: new URLSearchParams(window.location.search).has('force3d'),
            onReady: () => {
              setLive(true);
              onLiveRef.current?.();
            },
            onError: () => { viewer?.dispose(); viewer = undefined; viewerRef.current = undefined; },
          });
          viewerRef.current = viewer;
          sync();
        })
        // No WebGL, or the chunk failed: keep the poster, no error UI
        .catch(() => { viewer?.dispose(); viewer = undefined; });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      viewer?.dispose();
      viewerRef.current = undefined;
    };
  }, [seen, exhibit.model]);

  return (
    <figure
      ref={figRef}
      aria-label={exhibit.ariaLabel}
      className={`relative m-0 ml-[10%] flex aspect-[5/4] flex-col overflow-hidden border-[1.5px] border-ink transition-colors duration-300 ${skin.figure}`}
    >
      <Corner pos="top-3 left-3 border-t-2 border-l-2" />
      <Corner pos="top-3 right-3 border-t-2 border-r-2" />
      <Corner pos="bottom-3 left-3 border-b-2 border-l-2" />
      <Corner pos="bottom-3 right-3 border-b-2 border-r-2" />

      <figcaption className={`label-sm relative z-10 flex items-center justify-between gap-3 px-10 pt-[18px] max-sm:px-8 ${skin.text}`}>
        <span>{exhibit.figure}</span>
        <span className="inline-flex items-center gap-2">
          <RotateIcon />
          {exhibit.hint}
        </span>
      </figcaption>

      <div className="relative flex flex-auto items-center justify-center px-[8%]">
        <span
          aria-hidden="true"
          className={`absolute top-[66%] left-1/2 aspect-[4/1] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed ${skin.ring}`}
        />
        <img
          src={asset(exhibit.poster.src)}
          alt=""
          width={exhibit.poster.width}
          height={exhibit.poster.height}
          decoding="async"
          fetchPriority="low"
          className={`relative block h-auto w-full max-w-[520px] transition-opacity duration-300 ${live ? 'opacity-0' : 'opacity-100'}`}
        />
        <div
          ref={stageRef}
          className={`absolute inset-0 transition-opacity duration-300 ${live ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <p className={`relative z-10 m-0 self-end px-10 pb-[22px] text-right font-mono text-[11px] leading-[1.5] max-sm:px-8 ${skin.text}`}>
        {exhibit.credit[0]}<br />{exhibit.credit[1]}
      </p>
    </figure>
  );
};

export default JsExhibit;
