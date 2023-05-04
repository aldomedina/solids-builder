import { Grid, OrbitControls, TransformControls } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import React from "react";
import Solids from "../components/Solids";
import useSceneStore from "@/stores/scene";
import useSolidsStore from "@/stores/solids";

const gridConfig = {
  cellSize: 0.6,
  cellThickness: 1,
  cellColor: "#424241",
  sectionSize: 3.3,
  sectionThickness: 1.5,
  sectionColor: "#424241",
  fadeDistance: 50,
  fadeStrength: 1,
  followCamera: true,
  infiniteGrid: true,
};

const CreatorScene = () => {
  const { backgroundColor, grid } = useSceneStore();
  const { target, transformMode } = useSolidsStore();

  return (
    <Canvas>
      <color attach="background" args={[backgroundColor]} />
      <OrbitControls makeDefault />
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.8} position={[-3, 0, 3]} />
      {grid && (
        <Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} {...gridConfig} />
      )}
      <Solids />
      {target && <TransformControls object={target} mode={transformMode} />}
    </Canvas>
  );
};

export default CreatorScene;
