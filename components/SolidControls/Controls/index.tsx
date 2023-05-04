import Dropdown from "@/components/Dropdown";
import { TMaterial } from "@/stores/constants/solidInitialModificationsState";
import useSolidsStore from "@/stores/solids";
import React, { useState } from "react";
import ExplodedControls from "./ExplodedControls";

const Controls: React.FC<{ solidId: string }> = ({ solidId }) => {
  const material = useSolidsStore((s) => {
    const solid = new Map(s.activeSolids).get(solidId);
    if (!solid) return "standard";
    return solid.state.material;
  });
  const setMaterial = useSolidsStore((s) => s.setMaterial);

  return (
    <div>
      <Dropdown
        value={{ label: material, value: material }}
        setValue={(item) => setMaterial(solidId, item.value as TMaterial)}
        options={["exploded", "original"].map((el) => ({
          label: el,
          value: el,
        }))}
      />
      {(() => {
        switch (material) {
          case "exploded":
            return <ExplodedControls solidId={solidId} />;

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Controls;
