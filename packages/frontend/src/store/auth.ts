import axios from "@/lib/axios";
import { create } from "zustand";

type Store = {
  login: (data: any) => Promise<any>;
  register: (data: any) => Promise<any>;
};

export const useAuthStore = create<Store>()((set) => {
  const url = "/auth";
  return {
    login: async (data) => (await axios.post(`${url}/login`, data)).data,
    register: async (data) => (await axios.post(`${url}/register`, data)).data,
  };
});