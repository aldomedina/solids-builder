import { Color } from "three";

const effectShaderPass = {
  uniforms: {
    tDiffuse: { value: null },
    color: { value: new Color("red") },
  },

  vertexShader: /* glsl */ `
  varying vec2 vUv;
  void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }`,
  fragmentShader: /* glsl */ `
	uniform vec3 color;
	uniform sampler2D tDiffuse;
	varying vec2 vUv;
	void main() {
		vec4 previousPassColor = texture2D(tDiffuse, vUv);
		gl_FragColor = vec4(
			previousPassColor.rgb * color,
			previousPassColor.a);
	}			
  `,
};

export { effectShaderPass };
