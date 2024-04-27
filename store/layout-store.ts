import { createStore } from "zustand/vanilla";

type SideBarStoreState = {
  isOpen: boolean;
  aspectRatio: string;
  toggle: () => void;
  setAspectRatio16by9: () => void;
  setAspectRatio4by3: () => void;
};

export const SideBarStore = createStore<SideBarStoreState>((set) => ({
  isOpen: false,
  aspectRatio: "16 / 9",
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setAspectRatio16by9: () => set({ aspectRatio: "16 / 9" }),
  setAspectRatio4by3: () => set({ aspectRatio: "4 / 3" }),
}));
