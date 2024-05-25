import axios from "@/lib/axios";
import { create } from "zustand";

type Store = {
  findUserById: (id: number) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
  create: (data: any) => Promise<any>;
  getAll: () => Promise<any>;
};

export const useUserStore = create<Store>()((set) => {
  const url = "/user";

  return {
    findUserById: async (id) => (await axios.get(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data
  };
});
