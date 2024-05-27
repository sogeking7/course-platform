import axios from "@/lib/axios";
import { create } from "zustand";

type Store = {
  delete: (id: number) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
  create: (courseId: number, data: any) => Promise<any>;
  getAll: () => Promise<any>;
  getById: (id: number) => Promise<any>;
};

export const useSectionStore = create<Store>()((set) => {
  const url = "/section";

  return {
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (courseId, data) =>
      (await axios.post(`${url}`, { courseId, ...data })).data,
    getAll: async () => (await axios.get(`${url}`)).data,
    getById: async (id) => (await axios.get(`${url}/${id}`)).data,
  };
});
