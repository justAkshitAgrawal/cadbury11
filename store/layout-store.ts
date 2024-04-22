import { createStore } from "zustand/vanilla";

type SideBarStoreState = {
  isOpen: boolean;
  toggle: () => void;
};

export const SideBarStore = createStore<SideBarStoreState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
