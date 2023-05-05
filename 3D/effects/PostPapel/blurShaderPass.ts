import { Color, Vector2 } from "three";

const blurShaderPass = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
  },

  vertexShader: /* glsl */ `
  varying vec2 vUv;
  uniform vec2 resolution;
  void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
  }`,

  fragmentShader: /* glsl */ `
	uniform vec3 color;
	uniform sampler2D tDiffuse;
  uniform vec2 resolution;
	varying vec2 vUv;

    vec4 gaussianBlur(sampler2D _texture, vec2 uv,float _size,float _quality,float _directions) {
     
        float Pi = 6.28318530718; // Pi*2
        
        // GAUSSIAN BLUR SETTINGS {{{
        float Directions = _directions; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
        float Quality = _quality; // BLUR QUALITY (Default 4.0 - More is better but slower)
        float Size = _size; // BLUR SIZE (Radius)
        // GAUSSIAN BLUR SETTINGS }}}
      
        vec2 Radius = Size/resolution;
        
        // Normalized pixel coordinates (from 0 to 1)
        // Pixel colour
        vec4 Color = texture(_texture, uv);
        
        // Blur calculations
        for( float d=0.0; d<Pi; d+=Pi/Directions)
        {
        for(float i=1.0/Quality; i<=1.0; i+=1.0/Quality)
            {
          Color += texture( _texture, uv+vec2(cos(d),sin(d))*Radius*i);		
            }
        }
        
        // Output to screen
        Color /= Quality * Directions - 15.0;
        return Color;
      }


	void main() {
		gl_FragColor =  gaussianBlur(tDiffuse,vUv,9.0,32.0,16.0);
	}			
  `,
};

export { blurShaderPass };

/*    blendFunction = BlendFunction.ALPHA,
    uDisplacementMap = null,
    uEdgeStrength = 0.53,
    uEdgeColor = new Color(0xff0000),
    uNoiseAmp = 0.1,
    uNoiseFreq = 2.0,
    uGrainAmount = 0.35,
    uDisplaceColor = false,*/
