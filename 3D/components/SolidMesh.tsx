import useSolidsStore from "@/stores/solids";
import { Mesh, MeshStandardMaterial } from "three";
import ExplodingMaterial from "../materials/ExplodingMaterial";
import palettes from "@/lib/palettes";

const SolidMesh: React.FC<{ mesh: Mesh; solidId: string }> = ({
  mesh,
  solidId,
}) => {
  const material = useSolidsStore((s) => {
    const solid = new Map(s.activeSolids).get(solidId);
    if (!solid) return "standard";
    return solid.state.material;
  });

  const strength = useSolidsStore((s) => {
    const solid = new Map(s.activeSolids).get(solidId);
    if (!solid) return 0.5;
    return solid.state.exploded.strength;
  });

  const frequency = useSolidsStore((s) => {
    const solid = new Map(s.activeSolids).get(solidId);
    if (!solid) return 0.5;
    return solid.state.exploded.frequency;
  });

  const amplitude = useSolidsStore((s) => {
    const solid = new Map(s.activeSolids).get(solidId);
    if (!solid) return 0.5;
    return solid.state.exploded.amplitude;
  });

  const { geometry } = mesh;
  geometry.computeBoundingBox();
  geometry.center();
  if (!geometry.boundingBox) return null;
  return (
    <mesh geometry={mesh.geometry}>
      {(() => {
        switch (material) {
          case "exploded":
            return (
              <ExplodingMaterial
                palette={palettes[0]}
                strength={strength}
                amplitude={amplitude}
                frequency={frequency}
                max={geometry.boundingBox.max}
                min={geometry.boundingBox.min}
              />
            );
          case "original":
            return (
              <meshStandardMaterial
                {...(mesh.material as MeshStandardMaterial)}
              />
            );
          default:
            return null;
        }
      })()}
    </mesh>
  );
};

export default SolidMesh;
