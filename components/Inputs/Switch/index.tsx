import { motion } from "framer-motion";
import s from "./style.module.scss";
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Switch: React.FC<{
  value: boolean;
  set: (value: boolean) => void;
}> = ({ value, set }) => {
  const toggleSwitch = () => set(!value);
  return (
    <div className={s.switch} data-ison={value} onClick={toggleSwitch}>
      <motion.div className={s.handle} layout transition={spring} />
    </div>
  );
};
export default Switch;
