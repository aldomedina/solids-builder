import React, { Suspense, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group, Mesh } from "three";
import useModelLoaderStore from "@/store/model-loader-store";

interface IModelLoaderProps {
  url: string;
}

export default function ModelLoader({ url }: IModelLoaderProps) {
  const { scene } = useGLTF(url);
  const setMeshes = useModelLoaderStore((s) => s.setMeshes);
  useEffect(() => {
    if (scene) {
      const meshes: Mesh[] = [];
      scene.traverse((obj) => {
        //@ts-ignore
        if (obj.type === "Mesh") meshes.push(obj);
      });
      if (meshes) {
        setMeshes(meshes as Mesh[]);
      }
    }
  }, [scene, setMeshes]);
  return null;
}
