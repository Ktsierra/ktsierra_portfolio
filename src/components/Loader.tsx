import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="canvas-loader" />
      <p className="text-[#f1f1f1] text-xl font-extrabold mt-10">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default Loader;