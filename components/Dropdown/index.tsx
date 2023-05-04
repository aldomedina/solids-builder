import { AnimatePresence, motion } from "framer-motion";
import s from "./style.module.scss";
import { useRef, useState } from "react";
import Icon from "../Icon";
import cn from "classnames";
import { useOnClickOutside } from "@/utils";

type TValue = string | number | boolean;
type TDirection = "top" | "bottom";
interface IOption {
  label: string;
  value: TValue;
}
interface DropdownProps {
  options: IOption[];
  value: IOption;
  setValue: (value: IOption) => void;
  direction?: TDirection;
  placeholder?: string;
  initial?: boolean;
  fullWidth?: boolean;
}

const variants = {
  top: {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: { y: 0, opacity: 1 },
  },
  bottom: {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: { y: 0, opacity: 1 },
  },
};

const Dropdown = ({
  options,
  value,
  setValue,
  direction = "bottom",
  placeholder = "Select",
  initial = false,
  fullWidth = false,
}: DropdownProps) => {
  const [open, setOpen] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className={cn(s.wrapper, { [s.fullWidth]: fullWidth })}>
      <div
        className={cn(s.header, { [s.open]: open })}
        onClick={() => setOpen(true)}
      >
        <span className={s.text}>{value.label ?? placeholder}</span>
        <Icon icon={open ? "chevron-down" : "chevron-up"} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(s.drawer, s[direction])}
            variants={variants[direction]}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {options.map((el) => (
              <div
                key={`option-${el.value}`}
                onClick={() => {
                  setValue(el);
                  setOpen(false);
                }}
                className={cn(s.option, {
                  [s.selected]: value.value === el.value,
                })}
              >
                {el.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
