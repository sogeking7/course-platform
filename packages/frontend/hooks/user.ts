import { create } from "zustand";
import { User } from "../types";

type Store = {
  user: User | null;
  setUser: (user: User) => void;
};

export const userStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
