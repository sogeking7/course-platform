import axios from "@/lib/axios";
import { Section } from "@/types";
import { create } from "zustand";

type Store = {
  delete: (id: number) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
  create: (data: any) => Promise<any>;
  getAll: (courseId: number) => Promise<Section[]>;
  getById: (id: number) => Promise<any>;
};

export const useSectionStore = create<Store>()((set) => {
  const url = "/section";

  return {
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async (courseId) => (await axios.get(`${url}/all/${courseId}`)).data,
    getById: async (id) => (await axios.get(`${url}/${id}`)).data,
  };
});
