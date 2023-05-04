import useSolidsStore, { IActiveSolid } from "@/stores/solids";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import s from "./style.module.scss";
import Controls from "./Controls";
import DragHandler from "./DragHandler";

const Panel: React.FC<{
  activeSolid: IActiveSolid;
  setActivePanel: React.Dispatch<React.SetStateAction<number>>;
  activePanel: number;
  index: number;
  constraintsRef: React.RefObject<HTMLDivElement>;
}> = ({ activeSolid, setActivePanel, activePanel, index, constraintsRef }) => {
  const dragControls = useDragControls();
  const toggleActiveSolid = useSolidsStore((s) => s.toggleActiveSolid);
  const handleDrag = (e: React.PointerEvent<HTMLDivElement>) =>
    dragControls.start(e);

  return (
    <AnimatePresence key={activeSolid.solid.id.tokenId}>
      {activeSolid.open && (
        <motion.div
          onMouseEnter={() => setActivePanel(index)}
          style={{
            top: `${45 + index * 20}px`,
            right: `${10 + index * 20}px`,
            zIndex: activePanel === index ? 2 : 1,
          }}
          variants={{
            visible: {
              y: 0,
              opacity: 1,
            },
            hidden: {
              y: -30,
              opacity: 0,
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          drag
          dragControls={dragControls}
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragElastic={0}
          dragListener={false}
          dragMomentum={false}
          whileTap={{ cursor: "grabbing" }}
          className={s.panel}
        >
          <span className={s.nameTag} onPointerDown={handleDrag}>
            {activeSolid.solid.metadata.name}
          </span>
          <button
            className={s.closeButton}
            onClick={() => toggleActiveSolid(activeSolid.solid.id.tokenId)}
          >
            HIDE
          </button>
          <DragHandler handleDrag={handleDrag} />
          <Controls solidId={activeSolid.solid.id.tokenId} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Panel;
