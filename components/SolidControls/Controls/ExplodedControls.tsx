import useSolidsStore from "@/stores/solids";
import materialInputs from "@/lib/materialInputs";
import s from "./style.module.scss";

interface ExplodedControlsProps {
  solidId: string;
}
const { exploded: inputs } = materialInputs;

const ExplodedControls = ({ solidId }: ExplodedControlsProps) => {
  const setMaterialValue = useSolidsStore((s) => s.setMaterialValue);
  return (
    <div className={s.wrapper}>
      {inputs.map((el, i) => (
        <div key={solidId + i + "input" + el.name}>{el.name} </div>
      ))}
    </div>
  );
};

export default ExplodedControls;
