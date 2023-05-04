import useSolidsStore, { IActiveSolid } from "@/stores/solids";
import Solid from "./Solid";

const Solids = () => {
  const activeSolids = useSolidsStore((s) => {
    const arr: IActiveSolid[] = [];
    if (!s.activeSolids.size) return [];
    s.activeSolids.forEach((el) => arr.push(el));
    return arr;
  });
  return (
    <>
      {activeSolids?.map((el, i) => (
        <Solid key={el.solid.id.tokenId + i} solid={el.solid} />
      ))}
    </>
  );
};

export default Solids;
