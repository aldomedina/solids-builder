import { ISolid } from "@/types/solids";
import { create } from "zustand";
import init, {
  ISolidState,
  TMaterial,
} from "./constants/solidInitialModificationsState";
import { Object3D } from "three";

export interface IActiveSolid {
  open: boolean | string;
  solid: ISolid;
  state: ISolidState;
}

export type TTransformMode = "translate" | "rotate" | "scale";

interface SolidsState {
  isPanelOpen: boolean;
  target: Object3D | null;
  setTarget: (obj: Object3D) => void;
  setPanel: (isPanelOpen: boolean) => void;
  transformMode: TTransformMode;
  setTransformMode: (transformMode: TTransformMode) => void;
  togglePanel: () => void;
  activeSolids: Map<string, IActiveSolid>;
  addSolid: (solid: ISolid) => void;
  removeSolid: (id: string) => void;
  toggleActiveSolid: (id: string) => void;
  setMaterial: (id: string, value: TMaterial) => void;
  setMaterialValue: (
    id: string,
    material: TMaterial,
    key: string,
    value: string | number | boolean
  ) => void;
}

const useSolidsStore = create<SolidsState>()((set, get) => ({
  isPanelOpen: false,
  setPanel: (isPanelOpen) => set((state) => ({ isPanelOpen })),
  target: null,
  setTarget: (target: Object3D) => set((state) => ({ target })),
  transformMode: "translate",
  setTransformMode: (transformMode: TTransformMode) =>
    set((state) => ({ transformMode })),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  activeSolids: new Map(),
  addSolid: (solid) =>
    set((state) => ({
      activeSolids: new Map(state.activeSolids).set(solid.id.tokenId, {
        solid,
        open: true,
        state: init,
      }),
    })),
  removeSolid: (removedSolidId) =>
    set((state) => {
      const copy = new Map(state.activeSolids);
      copy.delete(removedSolidId);
      return {
        activeSolids: copy,
      };
    }),
  toggleActiveSolid: (id) =>
    set((state) => {
      const newState = new Map(state.activeSolids);
      const solidState = newState.get(id);
      if (solidState)
        newState.set(id, { ...solidState, open: !solidState?.open });
      return { activeSolids: newState };
    }),
  setMaterial: (id, material) =>
    set((state) => {
      const newState = new Map(state.activeSolids);
      const solidState = newState.get(id);
      if (!solidState) return state;
      newState.set(id, {
        ...solidState,
        state: {
          ...solidState.state,
          material,
        },
      });
      return { activeSolids: newState };
    }),
  setMaterialValue: (id, material, key, value) =>
    set((state) => {
      const newState = new Map(state.activeSolids);
      const solidState = newState.get(id);
      if (!solidState) return state;
      newState.set(id, {
        ...solidState,
        state: {
          ...solidState.state,
          [material]: {
            //@ts-ignore
            ...solidState.state[material],
            [key]: value,
          },
        },
      });
      return { activeSolids: newState };
    }),
}));

export default useSolidsStore;
