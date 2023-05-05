import { Color } from "three";
import noise from "@/3D/utils/noise";
import EffecftBlendMode from "@/3D/utils/glslBlendMode";
import { IPostPapel } from "@/stores/effects/effects";

const numero = 0;

const getPaperShaderPass = ({
  uNoiseAmp,
  uPosterizeSteps,
  uPosterizeMix,
  uBurnAmmount,
  uBlurInfluence,
  uEdgeStrength,
  uNoiseFreq,
  uSeed,
  uEdgeAlpha,
  uGrainAmount,
  uEdgeColor,
  uBlendMode,
  uBlendModeMix,
  uBypass,
}: IPostPapel) => ({
  uniforms: {
    tDiffuse: { value: null },
    tBlured: { value: null },
    uTexelSize: { value: [0.0, 0.0] },
    uEdgeStrength: { value: uEdgeStrength, min: 0.0, max: 0.99 },
    uSeed: { value: uSeed, min: 0.01, max: 10.0 },
    uNoiseAmp: {
      value: uNoiseAmp,
      min: 0.0,
      max: 1.0,
      step: 0.001,
      label: "Noise Amp",
    },
    uEdgeAlpha: { value: uEdgeAlpha },
    uEdgeColor: { value: new Color(uEdgeColor) },
    uGrainAmount: { value: uGrainAmount },
    uResolution: { value: [0.0, 0.0] },
    uBlurInfluence: { value: uBlurInfluence, min: 0.2, max: 1.0 },
    uNoiseFreq: { value: uNoiseFreq, min: 0.01, max: 4.0 },
    uBurnAmmount: { value: uBurnAmmount, min: 0.01, max: 0.3 },
    uPosterizeSteps: { value: uPosterizeSteps, min: 2, max: 64 },
    uPosterizeMix: { value: uPosterizeMix, min: 0.01, max: 1.0 },
    uBlendModeMix: { value: uBlendModeMix, min: 0.0, max: 1.0 },
    uBypass: { value: uBypass },
  },
  vertexShader: /* glsl */ `
  varying vec2 vUv;
  void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }`,
  fragmentShader: /* glsl */ `
  precision highp float;
  #define TWO_PI 6.28318530718

	uniform vec3 color;
	uniform sampler2D tDiffuse;
  uniform sampler2D tBlured;
  uniform vec2 uTexelSize;
  uniform float uNoiseFreq;
  uniform float uEdgeStrength;
  uniform float uSeed;
  uniform float uBlurInfluence;
  uniform float uNoiseAmp;
  uniform bool  uDisplaceColor;
  uniform float uEdgeAlpha;
  uniform vec3  uEdgeColor;
  uniform float uGrainAmount;
  uniform vec2 uResolution;
  uniform float uBurnAmmount;
  uniform float uPosterizeSteps;
  uniform float uPosterizeMix;
  uniform float uBlendModeMix;
	varying vec2 vUv;
  uniform bool uBypass;

  ${noise}
  ${EffecftBlendMode(uBlendMode)}

  vec3 posterize(vec3 color, float steps) {
    float s = 1.0 / steps;
    return floor(color * steps) * s + s * 0.5;
  }

  float noise(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  float fbm(vec2 uv) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(uv);
      uv = rot * uv * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  // hatched function like a drawing

  float hatch(vec2 uv, float angle, float scale, float width) {
    vec2 p = vec2(cos(angle), sin(angle)) * scale;
    return smoothstep(0.5 - width, 0.5 + width, abs(mod(uv.x * p.x + uv.y * p.y, 1.0) - 0.5));
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {  
    return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(base, vec3(0.5)));
  }

  float turbulence( vec3 p,float _it) {
    float t = - 0.1;
    for (float f = 1.0 ; f <= _it ; f++ ){
      float power = pow( 2.0, f );
      t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
    }
    return t;
  }



  float sobel(sampler2D _texture, vec2 uv) {

    vec2 texel = uTexelSize;
    

    const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
    const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel
  // first column
    float tx0y0 = texture2D( _texture, uv + texel * vec2( -1, -1 ) ).r;
    float tx0y1 = texture2D( _texture, uv + texel * vec2( -1,  0 ) ).r;
    float tx0y2 = texture2D( _texture, uv + texel * vec2( -1,  1 ) ).r;
  // second column
    float tx1y0 = texture2D( _texture, uv + texel * vec2(  0, -1 ) ).r;
    float tx1y1 = texture2D( _texture, uv + texel * vec2(  0,  0 ) ).r;
    float tx1y2 = texture2D( _texture, uv + texel * vec2(  0,  1 ) ).r;
  // third column
    float tx2y0 = texture2D( _texture, uv + texel * vec2(  1, -1 ) ).r;
    float tx2y1 = texture2D( _texture, uv + texel * vec2(  1,  0 ) ).r;
    float tx2y2 = texture2D( _texture, uv + texel * vec2(  1,  1 ) ).r;
  // gradient value in x direction
    float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
      Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
      Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;
  // gradient value in y direction
    float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
      Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
      Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;
  // magnitute of the total gradient
    float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );
    return G;

  }

  vec2 displaceUV(vec2 uv, vec2 _dis,float amount, float time) {
    vec2 edgeUV = uv;
    edgeUV.x += amount*(sin(_dis.x*TWO_PI)*amount);
    edgeUV.y += amount*(cos(_dis.y*TWO_PI)*amount);
    return edgeUV;

  }

	void main() {
    float seed= uSeed;
    vec2 uv = vUv;
    vec2 aspectCorrectUv = vec2(uv.x * uResolution.x / uResolution.y, uv.y);

    float perlin = .5+.5*pnoise(vec3(aspectCorrectUv*uNoiseFreq*40.0,uSeed),vec3(uResolution.x,uResolution.y,100.0));
    float perlin2 = .5+.5*pnoise(vec3(aspectCorrectUv*uNoiseFreq*35.0,uSeed),vec3(uResolution.x,uResolution.y,100.0));
    float perlin3 = .5+.5*pnoise(vec3(aspectCorrectUv*uNoiseFreq*10.0,uSeed),vec3(uResolution.x*.2,uResolution.y*.2,50.0));
    float perlin4 = pnoise(vec3(aspectCorrectUv*1.0,uSeed),vec3(uResolution.x,uResolution.y,20.0));

    vec2 dVal = vec2(perlin+perlin3);
    float noiseAmp = uNoiseAmp/5.0;


    vec2 edgeUV = displaceUV(uv,dVal,noiseAmp,0.0);
    vec2 edgeUV2 = displaceUV(uv,vec2(perlin2),noiseAmp,0.0);
    vec4 sourceColor = texture2D(tDiffuse, uv);

    vec4 inputColor = texture2D(tDiffuse, edgeUV2);
    vec4 inputBlur = texture2D(tBlured,edgeUV2);
    inputBlur.xyz=mix(inputBlur.xyz,posterize(inputBlur.xyz,uPosterizeSteps),uPosterizeMix);
    float noise = fbm(vUv);


    float iG = step(max(0.01,1.0-uEdgeStrength),sobel(tDiffuse,edgeUV2));
    float iG2 =sobel(tBlured,edgeUV2);
    vec4 blurEdgeColor = inputColor;
    blurEdgeColor.xyz*=iG;

    vec4 fColor = inputColor;
    fColor.xyz=mix(fColor.xyz,posterize(fColor.xyz,uPosterizeSteps),uPosterizeMix);
    
    float brillo = smoothstep(0.2,1.0,luma(inputColor.xyz));
    float brillob = luma(inputBlur.xyz);

    vec3 grainColor = blendSoftLight(vec3(brillo), vec3(noise));
    float response = smoothstep(0.05, 0.5, brillo);
    fColor.a=inputColor.a;
    fColor=mix(inputBlur,fColor,smoothstep(0.0,1.0,uBlurInfluence+(1.0-brillo)));
    fColor.xyz+=((perlin4)*2.0-1.0)*uBurnAmmount;

    fColor=mix(fColor,vec4(uEdgeColor,iG),(1.0-smoothstep(uEdgeStrength,1.0,1.0-iG))*uEdgeAlpha*(perlin));
    fColor.xyz+=(vec3(noise)*2.0-1.0)*uGrainAmount*pow(brillo,4.0);    


		gl_FragColor = mix(blend(sourceColor,fColor,uBlendModeMix),fColor,uBypass ? 1.0 : 0.0);//vec4(vec3(perlin3),1.0);//mix(texture2D(tDiffuse,vUv),texture2D(tBlured,vUv),step(.5,vUv.x));
    gl_FragColor.a=fColor.a;
  }			
  `,
});

export { getPaperShaderPass };
