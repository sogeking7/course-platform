import axios from "@/lib/axios";
import { User } from "@/types";
import { create } from "zustand";

type Store = {
  uploadPhoto: (id: number, data: any) => Promise<User>;
  deletePhoto: (id: number) => Promise<User>;
  findUserById: (id: number) => Promise<User>;
  update: (id: number, data: any) => Promise<User>;
  create: (data: any) => Promise<User>;
  getAll: () => Promise<User[]>;
  delete: (id: number) => Promise<User>;
};

export const useUserStore = create<Store>()((set) => {
  const url = "/user";

  return {
    uploadPhoto: async (id, data) =>
      (
        await axios.post(`${url}/${id}/upload-photo`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data,
    deletePhoto: async (id) =>
      (await axios.delete(`${url}/${id}/delete-photo`)).data,
    findUserById: async (id) => (await axios.get(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data,
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
  };
});
