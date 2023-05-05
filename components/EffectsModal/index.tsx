import { AnimatePresence, motion } from "framer-motion";
import { postPapelInit } from "@/stores/effects/init";
import s from "./style.module.scss";
import useEffectsStore from "@/stores/effects";
import { useRef } from "react";
import { useOnClickOutside } from "@/utils";
import { TEffect } from "@/stores/effects/effects";

const EffectsModal = () => {
  const modalRef = useRef<HTMLUListElement>(null);
  const open = useEffectsStore((s) => s.modalOpen);
  const setModalOpen = useEffectsStore((s) => s.setModalOpen);
  const addEffect = useEffectsStore((s) => s.addEffect);
  const activeEffects = useEffectsStore((s) => {
    const ids: TEffect[] = [];
    s.effects.forEach((el) => ids.push(el.id));
    return ids;
  });
  useOnClickOutside(modalRef, () => setModalOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          className={s.modal}
          ref={modalRef}
          variants={{
            visible: {
              opacity: 1,
              x: 0,
            },
            hidden: {
              opacity: 0,
              x: -140,
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <li className={s.modalTitle}>EFFECTS</li>
          <li
            className={s.effect}
            onClick={() => {
              const isSelected = activeEffects?.find("postpapel");
              addEffect({ id: "postpapel", params: postPapelInit });
              setModalOpen(false);
            }}
          >
            Post papel
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default EffectsModal;
