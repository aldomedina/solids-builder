import useSolidsStore, { TTransformMode } from "@/stores/solids";
import Button from "../Button";
import s from "./style.module.scss";
import classNames from "classnames";
import Dropdown from "../Dropdown";
import ColorInput from "../Inputs/ColorInput";
import useSceneStore from "@/stores/scene";
import useEffectsStore from "@/stores/effects";

const modeOptions = ["translate", "rotate", "scale"];
const BottomTools = () => {
  const setEffectsOpen = useEffectsStore((s) => s.setModalOpen);
  const setTransformMode = useSolidsStore((s) => s.setTransformMode);
  const transformMode = useSolidsStore((s) => s.transformMode);
  const { backgroundColor, setBackgroundColor, grid, setGrid } =
    useSceneStore();

  return (
    <div className={classNames(s.wrapper)}>
      <div>
        <Button
          variant="outlined"
          className={s.btn}
          onClick={() => setEffectsOpen(true)}
        >
          + EFFECTS
        </Button>
      </div>
      <div className={s.tools}>
        <div className={s.transformMode}>
          <Dropdown
            value={{ value: transformMode, label: transformMode }}
            options={modeOptions.map((el) => ({ label: el, value: el }))}
            setValue={(el) => setTransformMode(el.value as TTransformMode)}
            direction="top"
            fullWidth
          />
        </div>
        <Button
          variant={grid ? "contained" : "outlined"}
          className={classNames(s.grid, { [s.active]: grid })}
          onClick={() => setGrid(!grid)}
        >
          GRID
        </Button>
        <div className={s.colorInputWrapper}>
          <ColorInput
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomTools;
