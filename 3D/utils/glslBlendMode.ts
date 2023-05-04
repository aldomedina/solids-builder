const COLOR_CONVERT_GLSL = `
vec3 HSLToRGB( in vec3 c )
  {
      vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

      return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
  }
  vec3 RGBToHSL( in vec3 c ){
    float h = 0.0;
    float s = 0.0;
    float l = 0.0;
    float r = c.r;
    float g = c.g;
    float b = c.b;
    float cMin = min( r, min( g, b ) );
    float cMax = max( r, max( g, b ) );
  
    l = ( cMax + cMin ) / 2.0;
    if ( cMax > cMin ) {
      float cDelta = cMax - cMin;
          
          //s = l < .05 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) ); Original
      s = l < .0 ? cDelta / ( cMax + cMin ) : cDelta / ( 2.0 - ( cMax + cMin ) );
          
      if ( r == cMax ) {
        h = ( g - b ) / cDelta;
      } else if ( g == cMax ) {
        h = 2.0 + ( b - r ) / cDelta;
      } else {
        h = 4.0 + ( r - g ) / cDelta;
      }
  
      if ( h < 0.0) {
        h += 6.0;
      }
      h = h / 6.0;
    }
    return vec3( h, s, l );
  }
  `;


const ADD=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, x + y, opacity);

}
`;
const ALPHA=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, y, min(y.a, opacity));

}
`;
const AVERAGE=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, (x + y) * 0.5, opacity);

}
`;
const COLOR_BURN=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 z = mix(step(0.0, y) * (1.0 - min(vec4(1.0), (1.0 - x) / y)), vec4(1.0), step(1.0, x));
  return mix(x, z, opacity);

}
`;
const COLOR_DODGE=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 z = step(0.0, x) * mix(min(vec4(1.0), x / max(1.0 - y, 1e-9)), vec4(1.0), step(1.0, y));
  return mix(x, z, opacity);

}
`;
const COLOR=`
${COLOR_CONVERT_GLSL}
vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec3 xHSL = RGBToHSL(x.rgb);
  vec3 yHSL = RGBToHSL(y.rgb);
  vec3 z = HSLToRGB(vec3(yHSL.rg, xHSL.b));
  return vec4(mix(x.rgb, z, opacity), y.a);

}
`;
const DARKEN=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, min(x, y), opacity);

}
`;
const DIFFERENCE=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, abs(x - y), opacity);

}
`;
const DIVIDE=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, x / max(y, 1e-12), opacity);

}
`;
const EXCLUSION=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, (x + y - 2.0 * x * y), opacity);

}
`;
const HARD_LIGHT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 a = min(x, 1.0), b = min(y, 1.0);
  vec4 z = mix(2.0 * a * b, 1.0 - 2.0 * (1.0 - a) * (1.0 - b), step(0.5, y));
  return mix(x, z, opacity);

}
`;
const HARD_MIX=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, step(1.0, x + y), opacity);

}
`;
const HUE=`

${COLOR_CONVERT_GLSL}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec3 xHSL = RGBToHSL(x.rgb);
  vec3 yHSL = RGBToHSL(y.rgb);
  vec3 z = HSLToRGB(vec3(yHSL.r, xHSL.gb));
  return vec4(mix(x.rgb, z, opacity), y.a);

}
`;
const INVERT_RGB=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, y * (1.0 - x), opacity);

}
`;
const INVERT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, 1.0 - y, opacity);

}
`;
const LIGHTEN=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, max(x, y), opacity);

}
`;
const LINEAR_BURN=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, clamp(y + x - 1.0, 0.0, 1.0), opacity);

}
`;
const LINEAR_DODGE=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, min(x + y, 1.0), opacity);

}
`;
const LINEAR_LIGHT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, clamp(2.0 * y + x - 1.0, 0.0, 1.0), opacity);

}
`;
const LUMINOSITY=`
${COLOR_CONVERT_GLSL}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec3 xHSL = RGBToHSL(x.rgb);
  vec3 yHSL = RGBToHSL(y.rgb);
  vec3 z = HSLToRGB(vec3(xHSL.rg, yHSL.b));
  return vec4(mix(x.rgb, z, opacity), y.a);

}
`;
const MULTIPLY=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, x * y, opacity);

}
`;
const NEGATION=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, 1.0 - abs(1.0 - x - y), opacity);

}
`;
const NORMAL=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, y, opacity);

}
`;
const OVERLAY=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 z = mix(2.0 * y * x, 1.0 - 2.0 * (1.0 - y) * (1.0 - x), step(0.5, x));
  return mix(x, z, opacity);

}
`;
const PIN_LIGHT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 y2 = 2.0 * y;

  vec4 z = mix(
          mix(y2, x, step(0.5 * x, y)),
          max(vec4(0.0), y2 - 1.0),
          step(x, (y2 - 1.0))
  );

  return mix(x, z, opacity);

}
`;
const REFLECT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 z = mix(min(x * x / max(1.0 - y, 1e-12), 1.0), y, step(1.0, y));
  return mix(x, z, opacity);

}
`;
const SATURATION=`

${COLOR_CONVERT_GLSL}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {
  
  vec3 xHSL = RGBToHSL(x.rgb);
  vec3 yHSL = RGBToHSL(y.rgb);
  vec3 z = HSLToRGB(vec3(xHSL.r, yHSL.g, xHSL.b));
  return vec4(mix(x.rgb, z, opacity), y.a);

}
`;
const SCREEN=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, x + y - min(x * y, 1.0), opacity);

}
`;
const SOFT_LIGHT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 y2 = 2.0 * y;
  vec4 w = step(0.5, y);

  vec4 z = mix(
          x - (1.0 - y2) * x * (1.0 - x),
          mix(
                  x + (y2 - 1.0) * (sqrt(x) - x),
                  x + (y2 - 1.0) * x * ((16.0 * x - 12.0) * x + 3.0),
                  w * (1.0 - step(0.25, x))
          ),
          w
  );

  return mix(x, z, opacity);

}
`;
const SRC=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return y;

}
`;
const SUBTRACT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  return mix(x, max(x + y - 1.0, 0.0), opacity);

}
`;
const VIVID_LIGHT=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

  vec4 z = mix(
          max(1.0 - min((1.0 - x) / (2.0 * y), 1.0), 0.0),
          min(x / (2.0 * (1.0 - y)), 1.0),
          step(0.5, y)
  );

  return mix(x, z, opacity);

}
`;

const blendModes = [
  ADD,
  ALPHA,
  AVERAGE,
  COLOR_BURN,
  COLOR_DODGE,
  COLOR,
  DARKEN,
  DIFFERENCE,
  DIVIDE,
  EXCLUSION,
  HARD_LIGHT,
  HARD_MIX,
  HUE,
  INVERT_RGB,
  INVERT,
  LIGHTEN,
  LINEAR_BURN,
  LINEAR_DODGE,
  LINEAR_LIGHT,
  LUMINOSITY,
  MULTIPLY,
  NEGATION,
  NORMAL,
  OVERLAY,
  PIN_LIGHT,
  REFLECT,
  SATURATION,
  SCREEN,
  SOFT_LIGHT,
  SRC,
  SUBTRACT,
  VIVID_LIGHT
];

const blendNames =[
"ADD",
"ALPHA",
"AVERAGE",
"COLOR_BURN",
"COLOR_DODGE",
"COLOR",
"DARKEN",
"DIFFERENCE",
"DIVIDE",
"EXCLUSION",
"HARD_LIGHT",
"HARD_MIX",
"HUE",
"INVERT_RGB",
"INVERT",
"LIGHTEN",
"LINEAR_BURN",
"LINEAR_DODGE",
"LINEAR_LIGHT",
"LUMINOSITY",
"MULTIPLY",
"NEGATION",
"NORMAL",
"OVERLAY",
"PIN_LIGHT",
"REFLECT",
"SATURATION",
"SCREEN",
"SOFT_LIGHT",
"SRC",
"SUBTRACT",
"VIVID_LIGHT"
];


const EffecftBlendMode = (_blendId:number) => {
  //console.log(blendNames[_blendId])
  return blendModes[_blendId];
};


export default EffecftBlendMode;
