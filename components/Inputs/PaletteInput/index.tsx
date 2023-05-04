import { AnimatePresence, motion } from "framer-motion";

import cn from "classnames";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@/utils";
import palettes from "@/lib/palettes";

import s from "./style.module.scss";

const PaletteInput: React.FC<{
  active: string[];
  setValue: (palette: string[]) => void;
}> = ({ active, setValue }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className={cn(s.wrapper)}>
      <div
        className={cn(s.header, { [s.open]: open })}
        onClick={() => setOpen(true)}
        style={{
          backgroundImage: `linear-gradient(90deg, ${active[1]}, ${active[2]}, ${active[3]}, ${active[4]})`,
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className={cn(s.drawer)}
              variants={{
                hidden: {
                  y: -10,
                  opacity: 0,
                },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {palettes.map((palette) => (
                <div
                  key={`option-${JSON.stringify(palette)}`}
                  onClick={() => {
                    setValue(palette);
                    setOpen(false);
                  }}
                  className={cn(s.option, {
                    [s.selected]:
                      JSON.stringify(active) === JSON.stringify(palette),
                  })}
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${palette[1]}, ${palette[2]}, ${palette[3]}, ${palette[4]})`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaletteInput;
