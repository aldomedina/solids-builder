const fragmentShader = /*glsl*/ `
#define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))

varying float vDistort;
varying vec2 vUv;      
varying vec2 vUvB;      

uniform vec3 u_col1;
uniform vec3 u_col2;
uniform vec3 u_col3;
uniform vec3 u_col4;
uniform vec3 u_bg1;
uniform vec3 u_bg2;
uniform float u_time;
uniform float u_intensity;

uniform float u_grainTop;
uniform float u_grainBottom;
uniform float strokeW;
varying float v_d;
uniform float u_strength;
varying vec2 vUvA;
void main() {
  
  float h = 0.33;
    vec2 vUv=vUvA;
    float distort = vDistort;
    vec2 luv = vUvB;
    luv.y=smoothstep(0.0,1.0,luv.y);
    
    
    vec3 col1 = mix(mix(u_col1, u_col2, vUv.y/h), mix(u_col2, u_col3, (vUv.y - h)/(1.0 - h*2.)), vUv.y);  
    vec3 col2 = mix(mix(u_col3, u_col4, (vUv.y - h)/(1.0 - h*2.)), mix(u_col3, u_col4, (vUv.y - h*1.)/(1.0-h*2.)), distort);
    vec3 grad = mix(mix(u_col1,u_col2, luv.y),  mix(u_col3, u_col4, luv.y),luv.y);

  
  
  gl_FragColor = vec4(grad, 1.0);
}  
`;

export default fragmentShader;
