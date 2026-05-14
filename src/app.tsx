import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  OrbitControls,
  AsciiRenderer,
} from "@react-three/drei";
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
    scale: { value: 0.05, min: 0.01, max: 1, step: 0.01 },
  });

  const { mode, inverted, res } = useControls("Rendering Style", {
    mode: { options: ["norm", "ASCII", "blocks"] },
    inverted: true,
    res: { value: 0.15, min: 0.05, max: 0.5, step: 0.01 },
  });

  let asciiChars = "  .:-+*=%@#";
  let assciiInvertedChars = "  #@%=*+-:.";
  let blocksChars = "  ░▒▓█";
  let blocksInvertedChars = "  █▓▒░";

  let chars = mode === "ASCII" ? asciiChars : blocksChars;
  let invertedChars =
    mode === "ASCII" ? assciiInvertedChars : blocksInvertedChars;

  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* NOTE: this the line that added the lights to the environment so that we can see */}
        <Environment preset="city" />
        <color attach="background" args={["#0a0a0a"]} />

        {/* NOTE: Allows camera movement using mouse */}
        <OrbitControls />

        {/* NOTE: Scaled / put the model in the center */}
        <Center>
          <DiscobolousModel
            scale={scale}
            rotation={[rotateX, rotateY, rotateZ]}
          />
        </Center>

        {mode !== "norm" && (
          <AsciiRenderer
            key={`${mode}-${inverted}-${res}`} // NOTE: this fixed a bug that I has when I switch to inverted it ignores the fg and bg colors
            fgColor="white"
            bgColor="black"
            characters={inverted ? invertedChars : chars}
            resolution={res}
          />
        )}
      </Canvas>
    </>
  );
}
