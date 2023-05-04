import s from "./style.module.scss";

const DragHandler: React.FC<{
  handleDrag: (e: React.PointerEvent<HTMLDivElement>) => void;
}> = ({ handleDrag }) => (
  <div className={s.handler} onPointerDown={handleDrag}>
    <span />
    <span />
    <span />
  </div>
);

export default DragHandler;
