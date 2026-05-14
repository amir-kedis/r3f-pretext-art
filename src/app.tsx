import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  OrbitControls,
  AsciiRenderer,
  Html,
} from "@react-three/drei";
import { useControls } from "leva";
import {
  EffectComposer,
  DotScreen,
  Pixelation,
} from "@react-three/postprocessing";

import DiscobolousModel from "./models/Discobolus.jsx";
import { HologramShader } from "./HologramShader.jsx";

export function App() {
  // NOTE: very fancy cool version of ImGUI, seriously how did I live before knowing this
  const { rotateX, rotateY, rotateZ } = useControls("Model", {
    rotateX: { value: -0.5 * Math.PI, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotateY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotateZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  const { scale } = useControls("Model", {
    scale: { value: 0.05, min: 0.01, max: 1, step: 0.01 },
  });

  const { mode, inverted, res } = useControls("Rendering Style", {
    mode: { options: ["norm", "ASCII", "blocks", "dither", "hologram"] },
    inverted: true,
    res: { value: 0.15, min: 0.05, max: 0.5, step: 0.01 },
  });

  const { ditherStrength } = useControls(
    "Dither Effect",
    {
      ditherStrength: { value: 0.5, min: 0, max: 1, step: 0.01 },
    },
    { collapsed: true },
  );

  const { hologramGlitchIntensity } = useControls(
    "Hologram Effect",
    {
      hologramGlitchIntensity: { value: 1.5, min: 0.0, max: 5.0, step: 0.1 },
    },
    { collapsed: true },
  );

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
            onProjectedBounds={(bounds) => {}}
          />
        </Center>

        {(mode === "ASCII" || mode === "blocks") && (
          <AsciiRenderer
            key={`${mode}-${inverted}-${res}`} // NOTE: this fixed a bug that I has when I switch to inverted it ignores the fg and bg colors
            fgColor="white"
            bgColor="#0a0a0a"
            characters={inverted ? invertedChars : chars}
            resolution={res}
          />
        )}

        <>
          {(mode === "dither" || mode === "hologram") && (
            <EffectComposer>
              {mode === "dither" && (
                <>
                  <Pixelation />
                  <DotScreen angle={Math.PI / 4} scale={ditherStrength} />
                </>
              )}
              {mode === "hologram" && (
                <HologramShader glitchIntensity={hologramGlitchIntensity} />
              )}
            </EffectComposer>
          )}
        </>
        <Html center>
          <div
            style={{
              color: "white",
              fontSize: "4em",
              fontFamily: '"Metamorphous", serif',
              width: "50vw",
              textAlign: "center",
            }}
          >
            We suffer more in imagination than in reality
          </div>
        </Html>
      </Canvas>
    </>
  );
}
