import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = ({ texture }: {texture: string}) => {
  const [decal] = useTexture([texture]);
  console.log(texture);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 5]} />
        <meshStandardMaterial
          color={'#fff8eb'}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 2 * Math.PI]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }: {icon: string}) => {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball texture={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;