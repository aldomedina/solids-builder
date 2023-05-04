import nc from "@/3D/utils/nc";

import { DoubleSide, ShaderMaterial, Vector3 } from "three";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface IExplodingMaterialProps {
  palette: string[];
  strength: number;
  max: Vector3;
  min: Vector3;
  amplitude: number;
  frequency: number;
  animated: boolean;
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
  animated,
}: IExplodingMaterialProps) => {
  const ref = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (animated)
      ref.current.uniforms.u_time.value = clock.getElapsedTime() * 0.1;
  });

  return (
    <shaderMaterial
      ref={ref}
      attach="material"
      args={[createMaterial(palette, strength, max, min, amplitude, frequency)]}
      side={DoubleSide}
    />
  );
};

export default ExplodingMaterial;
