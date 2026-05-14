import { Effect } from "postprocessing";

import fragmentShader from "./shaders/hologram.frag";
import { Uniform, WebGLRenderer, WebGLRenderTarget } from "three";
import { forwardRef, useMemo } from "react";

class HologramEffect extends Effect {
  constructor({ glitchIntensity = 1.0 } = {}) {
    super("HologramEffect", fragmentShader, {
      // NOTE: here we add the unfiorms that gets passed to the shader
      uniforms: new Map([
        ["time", new Uniform(0)],
        ["glitchIntensity", new Uniform(glitchIntensity)],
      ]),
    });
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
    deltaTime?: number,
  ): void {
    this.uniforms.get("time")!.value += deltaTime || 0;
  }
}

export const HologramShader = forwardRef(({ glitchIntensity = 1.0 }, ref) => {
  // NOTE: the constrctor will compile the shader,
  // we use memo to skip compiling the shader every render which is silly
  const effect = useMemo(() => new HologramEffect({ glitchIntensity }), []);

  effect.uniforms.get("glitchIntensity")!.value = glitchIntensity;

  return <primitive ref={ref} object={effect} dispose={null} />;
});
