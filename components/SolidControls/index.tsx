import { AnimatePresence, motion } from "framer-motion";
import s from "./style.module.scss";
import { useRef, useState } from "react";
import useSolidsStore, { IActiveSolid } from "@/stores/solids";
import Panel from "./Panel";

const SolidControls = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const activeSolids = useSolidsStore((s) => {
    if (!s.activeSolids.size) return [];
    const arr: IActiveSolid[] = [];
    s.activeSolids.forEach((el) => arr.push(el));
    return arr;
  });
  const [activePanel, setActivePanel] = useState(0);

  return (
    <>
      <div className={s.constrains} ref={constraintsRef}></div>
      {activeSolids?.map((activeSolid, i) => (
        <Panel
          key={activeSolid.solid.id.tokenId}
          activeSolid={activeSolid}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          index={i}
          constraintsRef={constraintsRef}
        />
      ))}
    </>
  );
};

export default SolidControls;
