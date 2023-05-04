import s from "./style.module.scss";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorInput = ({ value, onChange }: ColorInputProps) => {
  return (
    <input
      id="color"
      className={s.color}
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ColorInput;
