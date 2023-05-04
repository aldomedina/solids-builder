import { create } from "zustand";

interface AppState {}

const useAppStore = create<AppState>()((set, get) => ({}));
