import nc from "@/3D/utils/nc";

import { DoubleSide, Vector3 } from "three";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";

interface IExplodingMaterialProps {
  palette: string[];
  strength: number;
  max: Vector3;
  min: Vector3;
  amplitude: number;
  frequency: number;
}

const createMaterial = (
  palette: string[],
  strength: number,
  max: Vector3,
  min: Vector3,
  amplitude: number,
  frequency: number
) => ({
  vertexShader,
  fragmentShader,

  uniforms: {
    u_time: { value: 0.0 },
    u_speed: { value: 0.05 },
    u_density: { value: 2.0 },
    u_strength: { value: strength },
    u_frequency: { value: frequency },
    u_amplitude: { value: 0.0 },
    u_strengthAmplitude: { value: amplitude },
    u_intensity: { value: 1 },
    u_period: { value: 0.1 },
    u_bBoxMin: {
      value: min,
    },
    u_bBoxMax: {
      value: max,
    },
    u_col1: {
      value: nc(palette[1]),
    },
    u_col2: {
      value: nc(palette[2]),
    },
    u_col3: {
      value: nc(palette[3]),
    },
    u_col4: {
      value: nc(palette[4]),
    },
  },
});

const ExplodingMaterial = ({
  palette,
  strength,
  max,
  min,
  amplitude,
  frequency,
}: IExplodingMaterialProps) => {
  return (
    <shaderMaterial
      attach="material"
      args={[createMaterial(palette, strength, max, min, amplitude, frequency)]}
      side={DoubleSide}
    />
  );
};

export default ExplodingMaterial;
