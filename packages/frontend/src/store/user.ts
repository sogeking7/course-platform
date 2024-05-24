import axios from "@/lib/axios";
import { create } from "zustand";

type Store = {
  findUserById: (id: number) => Promise<any>;
};

export const useSidebar = create<Store>()((set) => {
  const url = "/user";

  return {
    findUserById: async (id) => (await axios.get(`${url}/${id}`)).data,
  };
});
