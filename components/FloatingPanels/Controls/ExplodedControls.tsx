import useSolidsStore from "@/stores/solids";
import materialInputs from "@/lib/materialInputs";
import s from "./style.module.scss";
import { useEffect } from "react";
import PaletteInput from "@/components/Inputs/PaletteInput";
import palettes from "@/lib/palettes";
import RangeInput from "@/components/Inputs/RangeInput";
import SwitchInput from "@/components/Inputs/SwitchInput";

interface ExplodedControlsProps {
  solidId: string;
}
const { exploded: inputs } = materialInputs;

const ExplodedControls = ({ solidId }: ExplodedControlsProps) => {
  const setMaterialValue = useSolidsStore((s) => s.setMaterialValue);
  const values = useSolidsStore((s) => {
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
  });

  return (
    <div className={s.wrapper}>
      {inputs.map((el, i) => (
        <div key={solidId + i + "input" + el.name}>
          {(() => {
            switch (el.type) {
              case "palette":
                return (
                  <PaletteInput
                    active={values.palette}
                    setValue={(palette) =>
                      setMaterialValue(solidId, "exploded", el.name, palette)
                    }
                  />
                );
              case "range":
                return (
                  <RangeInput
                    //@ts-ignore
                    value={values[el.name]}
                    setValue={(value) =>
                      setMaterialValue(solidId, "exploded", el.name, value)
                    }
                    input={el}
                  />
                );
              case "checkbox":
                return (
                  <SwitchInput
                    label={el.name}
                    //@ts-ignore
                    value={values[el.name]}
                    setValue={(value) =>
                      setMaterialValue(solidId, "exploded", el.name, value)
                    }
                  />
                );
              default:
                return null;
            }
          })()}{" "}
        </div>
      ))}
    </div>
  );
};

export default ExplodedControls;
