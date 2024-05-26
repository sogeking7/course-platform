import axios from "@/lib/axios";
import { create } from "zustand";

type Store = {
  findCourseById: (id: number) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
  create: (data: any) => Promise<any>;
  getAll: () => Promise<any>;
};

export const useCourseStore = create<Store>()((set) => {
  const url = "/course";

  return {
    findCourseById: async (id) => (await axios.get(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data,
  };
});
