import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import DiscobolousModel from "./models/Discobolus.jsx";

export function App() {
  // NOTE: very fancy cool version of ImGUI, seriously how did I live before knowing this
  const { rotateX, rotateY, rotateZ } = useControls("Statue Rotation", {
    rotateX: { value: -0.5 * Math.PI, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotateY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotateZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });
  const { scale } = useControls("Statue Scale", {
    scale: { value: 0.06, min: 0.01, max: 1, step: 0.01 },
  });

  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* NOTE: this the line that added the lights to the environment so that we can see */}
        <Environment preset="city" />

        {/* NOTE: Allows camera movement using mouse */}
        <OrbitControls />

        {/* NOTE: Scaled / put the model in the center */}
        <Center>
          <DiscobolousModel
            scale={scale}
            rotation={[rotateX, rotateY, rotateZ]}
          />
        </Center>
      </Canvas>
    </>
  );
}
