import { Suspense, useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";


const Computers = ({ isMobile }: { isMobile: boolean }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf', true);

  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor='black' />
      <pointLight intensity={1.5} decay={0} />
      <spotLight
        position={[-20, 50, 10]}
        decay={0}
        angle={0.12}
        penumbra={1}
        intensity={4}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.35, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Adds a listener to check if the window width is less than 768px
    const widthQuery = window.matchMedia('(max-width: 768px)');

    // Sets the initial value of isMobile
    setIsMobile(widthQuery.matches);

    // Defines the callback to handle the resize event
    const handleResize = (event: MediaQueryListEvent) => { setIsMobile(event.matches); };

    // Adds the callback to the resize event
    widthQuery.addEventListener('change', handleResize);

    // Removes the listener
    return () => { widthQuery.removeEventListener('change', handleResize); };
  }, []);


  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default ComputersCanvas;