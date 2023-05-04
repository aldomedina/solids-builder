import { ISolid } from "@/types/solids";
import { useGLTF, PivotControls, useCursor } from "@react-three/drei";
import SolidMesh from "./SolidMesh";
import useSolidsStore from "@/stores/solids";
import { Group, Mesh as TMesh } from "three";
import { useRef, useState } from "react";

const models = ["/models/93.glb", "/models/6714.glb"];

const Solid: React.FC<{ solid: ISolid }> = ({ solid }) => {
  //   const gltf = useGLTF(solid.metadata.model_url);
  const gltf = useGLTF(models[1]);
  const setTarget = useSolidsStore((s) => s.setTarget);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <group
      ref={groupRef}
      onClick={(e) => groupRef.current && setTarget(groupRef.current)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {
        //@ts-ignore
        Object.values(gltf?.nodes).map((el, i) => {
          //@ts-ignore
          if (!el.isMesh) return;

          return (
            <SolidMesh
              key={solid.id.tokenId + "mesh" + i}
              mesh={el as TMesh}
              solidId={solid.id.tokenId}
            />
          );
        })
      }
    </group>
  );
};

export default Solid;
