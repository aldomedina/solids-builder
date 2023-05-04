import { IInput } from "@/lib/materialInputs";
import s from "./style.module.scss";

interface RangeInputProps {
  input: IInput;
  value: number;
  setValue: (value: number) => void;
}

const RangeInput = ({
  input: { name, presets },
  value,
  setValue,
}: RangeInputProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.label}>{name}</div>
      <input
        className={s.input}
        type="range"
        {...presets}
        //@ts-ignore
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};

export default RangeInput;
