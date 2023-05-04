import Switch from "../Switch";
import s from "./style.module.scss";

interface SwitchInputProps {
  label: string;
  setValue: (value: boolean) => void;
  value: boolean;
}

const SwitchInput = ({ label, setValue, value }: SwitchInputProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.label}>{label}</div>
      <Switch value={value} set={setValue} />
    </div>
  );
};

export default SwitchInput;
