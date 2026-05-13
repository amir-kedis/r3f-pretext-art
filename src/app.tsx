import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";
import { Box } from "./box.js";
const store = createXRStore({});
export function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          position: "absolute",
          zIndex: 10000,
          background: "black",
          borderRadius: "0.5rem",
          border: "none",
          fontWeight: "bold",
          color: "white",
          cursor: "pointer",
          fontSize: "1.5rem",
          bottom: "1rem",
          left: "50%",
          boxShadow: "0px 0px 20px rgba(0,0,0,1)",
          transform: "translate(-50%, 0)",
        }}
      >
        <button
          style={{
            cursor: "pointer",
            padding: "1rem 2rem",
            fontSize: "1rem",
            background: "none",
            color: "white",
            border: "none",
          }}
          onClick={() => store.enterAR()}
        >
          Enter AR
        </button>
        <button
          style={{
            cursor: "pointer",
            padding: "1rem 2rem",
            fontSize: "1rem",
            background: "none",
            color: "white",
            border: "none",
          }}
          onClick={() => store.enterVR()}
        >
          Enter VR
        </button>
      </div>
      <Canvas>
        <XR store={store}>
          <Environment background preset="city" />
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </XR>
      </Canvas>
    </>
  );
}

