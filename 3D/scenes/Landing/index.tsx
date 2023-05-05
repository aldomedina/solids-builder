import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Group, Mesh } from "three";
import { easing } from "maath";
import { degToRad } from "three/src/math/MathUtils";

const Model = () => {
  const gltf = useGLTF("/models/6714.glb");
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    easing.dampE(
      ref.current.rotation,
      [0, -state.pointer.x * (Math.PI / 10), 0],
      1.5,
      delta
    );
    ref.current.rotation.z = degToRad(48);
  });
  const scale = 11;
  return (
    <group
      ref={ref}
      scale={[scale, scale, scale]}
      rotation={[0, 0, 0]}
      position={[0, -1, -1]}
    >
      {
        //@ts-ignore
        Object.values(gltf?.nodes).map((el, i) => {
          //@ts-ignore
          if (!el.isMesh) return;

          return (
            <mesh
              key={"landing-mesh-${i"}
              geometry={(el as Mesh).geometry}
              material={(el as Mesh).material}
            />
          );
        })
      }
    </group>
  );
};

const LandingScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.8} position={[0, -0.5, 4]} />
      <Model />
    </Canvas>
  );
};

export default LandingScene;
