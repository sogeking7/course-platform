import axios from "@/lib/axios";
import { Lecture } from "@/types";
import { create } from "zustand";

type Store = {
  delete: (id: number) => Promise<Lecture>;
  update: (id: number, data: any) => Promise<Lecture>;
  create: (data: any) => Promise<Lecture>;
  getAll: () => Promise<Lecture[]>;
  getById: (id: number) => Promise<Lecture>;
};

export const useLectureStore = create<Store>()((set) => {
  const url = "/lecture";

  return {
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data,
    getById: async (id) => (await axios.get(`${url}/${id}`)).data,
  };
});
