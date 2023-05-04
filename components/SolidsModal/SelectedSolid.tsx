import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useSolidsStore, { IActiveSolid } from "@/stores/solids";
import { convertIPFSImageLink, useOnClickOutside } from "@/utils";
import Button from "../Button";

import s from "./style.module.scss";
import cn from "classnames";
import Image from "next/image";

const SelectedSolid: React.FC<{
  el: IActiveSolid;
}> = ({ el }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleActiveSolid = useSolidsStore((s) => s.toggleActiveSolid);
  const removeSolid = useSolidsStore((s) => s.removeSolid);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useOnClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <motion.div
      className={s.solid}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            className={s.menu}
            ref={menuRef}
            variants={{
              visible: {
                y: 0,
              },
              hidden: {
                y: -200,
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Image
              src={convertIPFSImageLink(el.solid.metadata.image, true)}
              height={120}
              width={120}
              alt="solid"
            />
            <button
              className={s.menuItem}
              onClick={() => {
                toggleActiveSolid(el.solid.id.tokenId);
                setMenuOpen(false);
              }}
            >
              {el.open ? "HIDE" : "SHOW"} PANEL
            </button>
            <button
              className={s.menuItem}
              onClick={() => {
                removeSolid(el.solid.id.tokenId);
                setMenuOpen(false);
              }}
            >
              REMOVE
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setMenuOpen((s) => !s)}
        variant={el.open ? "contained" : "outlined"}
        className={cn(s.btn, { [s.selected]: el.open })}
      >
        {el.solid.metadata.name}
      </Button>
    </motion.div>
  );
};

export default SelectedSolid;
