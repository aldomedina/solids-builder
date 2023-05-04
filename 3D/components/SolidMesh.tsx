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

  const { strength, amplitude, frequency, animated, palette } = useSolidsStore(
    (s) => {
      const solid = new Map(s.activeSolids).get(solidId);
      if (!solid)
        return {
          strength: 0.5,
          amplitude: 0.5,
          frequency: 0.5,
          animated: false,
          palette: palettes[0],
        };
      const { strength, amplitude, frequency, animated, palette } =
        solid.state.exploded;
      return { strength, amplitude, frequency, animated, palette };
    }
  );
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
                animated={animated}
                palette={palette}
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
