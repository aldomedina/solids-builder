import useSolidsStore, { IActiveSolid } from "@/stores/solids";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";

import Button from "../Button";
import {
  convertIPFSImageLink,
  useContractDetails,
  useOnClickOutside,
} from "@/utils";
import { solidsAddress } from "@/lib/constants";

import s from "./style.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import SelectedSolid from "./SelectedSolid";
import Image from "next/image";

const MAX = 3;

const SolidsModal = () => {
  const modalRef = useRef<HTMLUListElement>(null);
  const { collection, usersSolids } = useContractDetails(solidsAddress);
  const open = useSolidsStore((s) => s.isPanelOpen);
  const setPanel = useSolidsStore((s) => s.setPanel);

  const togglePanel = useSolidsStore((s) => s.togglePanel);
  const activeSolids = useSolidsStore((s) => {
    if (!s.activeSolids.size) return [];
    const arr: IActiveSolid[] = [];
    s.activeSolids.forEach((el) => arr.push(el));
    return arr;
  });
  const addSolid = useSolidsStore((s) => s.addSolid);

  useOnClickOutside(modalRef, () => setPanel(false));

  return (
    <>
      <div className={cn(s.wrapper)}>
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
              <li className={s.modalTitle}>COLLECTION</li>
              {collection?.map((el) => {
                const isSelected = !!activeSolids?.find(
                  (item) => item.solid.id.tokenId === el.id.tokenId
                );
                if (!el.metadata.name) return null;
                return (
                  <li
                    key={el.id.tokenId}
                    className={cn(s.item, {
                      [s.selectedItem]: isSelected,
                    })}
                  >
                    <button
                      className={s.btn}
                      disabled={isSelected || activeSolids?.length >= MAX}
                      onClick={() => addSolid(el)}
                    >
                      <Image
                        src={convertIPFSImageLink(el.metadata.image, true)}
                        height={120}
                        width={120}
                        alt="solid"
                      />
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
        <div className={s.bar}>
          <Button className={s.btn} variant="outlined" onClick={togglePanel}>
            + SOLIDS
          </Button>
          <div className={s.solidsBar}>
            {activeSolids?.map((el) => (
              <SelectedSolid key={el.solid.id.tokenId} el={el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
//

export default SolidsModal;
