import { create } from "zustand";
import { IEffect, IEffects } from "./effects";

interface EffectsState {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  effects: IEffects;
  addEffect: (effect: IEffect) => void;
}

const useEffectsStore = create<EffectsState>()((set, get) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) => set((state) => ({ modalOpen })),
  effects: new Map(),
  addEffect: (effect) =>
    set((state) => ({
      effects: new Map(state.effects).set(effect.id, effect),
    })),
}));

export default useEffectsStore;
