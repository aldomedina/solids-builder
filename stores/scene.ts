import { create } from "zustand";
//@ts-ignore
import { secondaryColor } from "@/styles/theme/colors.module.scss";

interface SceneState {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  grid: boolean;
  setGrid: (grid: boolean) => void;
}

const useSceneStore = create<SceneState>()((set, get) => ({
  backgroundColor: secondaryColor,
  setBackgroundColor: (backgroundColor) => set(() => ({ backgroundColor })),
  grid: true,
  setGrid: (grid: boolean) => set(() => ({ grid })),
}));

export default useSceneStore;
