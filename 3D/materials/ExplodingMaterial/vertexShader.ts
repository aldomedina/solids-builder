import perlinNoise from "@/3D/utils/perlinNoiseGlsl";

const vertexShader = /*glsl*/ ` 

varying float vDistort;
  
varying vec2 vUv;
varying vec2 vUvB;
uniform vec3 u_bBoxMin;
uniform vec3 u_bBoxMax;
uniform float u_time;
uniform float u_speed;
uniform float u_density;
uniform float u_strength;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_period;
varying float v_d;

uniform float u_strengthAmplitude;
float u_noiseFrequency = 0.1;
varying vec2 vUvA;

${perlinNoise}

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, 0.0, s,
    0.0, 1.0, 0.0,
    -s, 0.0, c
  );
}

vec3 rotateY(vec3 v, float angle) {
  return rotation3dY(angle) * v;
}  

void main() {
    float t = u_time;
    float distortion = pnoise(((normal*u_frequency)+vec3(t,1.0,1.0)) * u_density, vec3(u_period)) * (u_strength*u_strengthAmplitude);
    vUv.y = (position.y - u_bBoxMin.y) / (u_bBoxMax.y - u_bBoxMin.y);

    vUvA = uv;
    vUvB = uv;
    vUvB.y = (position.y - u_bBoxMin.y) / (u_bBoxMax.y - u_bBoxMin.y);
    vUvA.y = (position.y - u_bBoxMin.y) / (u_bBoxMax.y - u_bBoxMin.y);

    
  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y  + t);
  //pos = rotateY(pos, angle);    
  vDistort = distortion;

  float d = length(vec3(position.x,u_bBoxMax.y,position.z)-vec3(position.x,position.y,position.z));
  v_d = smoothstep(0.0,1.5,d/u_bBoxMax.y);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}  



`;

export default vertexShader;
