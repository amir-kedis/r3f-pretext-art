uniform float time;
uniform float glitchIntensity;


void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // We will split the r,g,b and offset them 
  vec2 offset = vec2(sin(uv.y * 20.0 + time * 10.0) * 0.005 * glitchIntensity, 0.0);
  
  float r = texture2D(inputBuffer, uv + offset).r;
  float g = inputColor.g;
  float b = texture2D(inputBuffer, uv - offset).b;

  // Add scanlines (removed scanlines cause they look bad
  // float scanline = sin(uv.y * 800.0 + time * 15.0) * 0.4 * glitchIntensity;

  // MERGE
  outputColor = vec4(r, g, b, 1.0);
}
