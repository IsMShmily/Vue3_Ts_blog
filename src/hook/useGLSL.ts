/**
 * @description: 着色器
 * @return {*} - [vertexShader, fragmentShader]
 */
const useGLSL = () => {
  let vertexShader = /* GLSL */ `
    attribute float aSize;
    attribute vec4 aShift;
    uniform float uTime;
    varying vec3 vColor;
    const float PI = 3.141592653589793238;
  
    void main() {
        // float d = abs(position.y) / 10.0;
        float d = length(abs(position) / vec3(40., 10., 40.)); // 中间黄色、外面紫色
        d = clamp(d, 0., 1.);
  
        // rgb(227, 155, 0)
        // rgb(100, 50, 255)
        vec3 color1 = vec3(227., 155., 0.);
        vec3 color2 = vec3(100., 50., 255.);
        vColor = mix(color1, color2, d) / 255.;
        vec3 transformed = position;
        float theta = mod(aShift.x + aShift.z * uTime, PI * 2.);
        float phi = mod(aShift.y + aShift.z * uTime, PI * 2.);
        transformed += vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta)) * aShift.w;
  
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_PointSize = aSize * 50.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
    }
  `;
  let fragmentShader = /* GLSL */ `
    varying vec3 vColor;
  
    void main() {
      float d = length(gl_PointCoord.xy - 0.5);
      if (d > 0.5) discard;
      // gl_FragColor = vec4(vColor, step(0.5, 1.0 - d));
      gl_FragColor = vec4(vColor, smoothstep(0.5, 0.1, d));
    }
  `;

  return [vertexShader, fragmentShader];
};

export default useGLSL;
