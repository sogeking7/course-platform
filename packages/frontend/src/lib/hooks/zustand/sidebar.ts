import { create } from "zustand";

type Store = {
  isSideBarOpen: boolean;
  isMySheetOpen: boolean;
  setIsMySheetOpen: (state: boolean) => void;
  setIsSideBarOpen: (state: boolean) => void;
};

export const useSidebar = create<Store>()((set) => ({
  isSideBarOpen: true,
  isMySheetOpen: false,
  setIsMySheetOpen: (newValue) => set({ isMySheetOpen: newValue }),
  setIsSideBarOpen: (newValue) => set({ isSideBarOpen: newValue }),
}));
