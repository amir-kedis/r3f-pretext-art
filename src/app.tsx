import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";
import DiscobolousModel from "./models/Discobolus.jsx";

export function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
        {/* NOTE: this the line that added the lights to the environment so that we can see */}
        <Environment preset="city" />

        {/* NOTE: Allows camera movement using mouse */}
        <OrbitControls />

        {/* NOTE: Scaled / put the model in the center */}
        <Center>
          <DiscobolousModel />
        </Center>
      </Canvas>
    </>
  );
}
