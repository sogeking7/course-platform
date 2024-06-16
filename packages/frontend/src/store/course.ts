import axios from "@/lib/axios";
import { Course } from "@/types";
import { create } from "zustand";

type Store = {
  uploadPhoto: (id: number, data: any) => Promise<Course>;
  deletePhoto: (id: number) => Promise<Course>;
  getAllCoursesByUserId: (userId: number) => Promise<Course[]>;
  inviteByEmail: (data: { courseId: number; email: string }) => Promise<any>;
  findCourseById: (id: number) => Promise<Course>;
  findPublicCourseById: (id: number) => Promise<Course>;
  update: (id: number, data: any) => Promise<Course>;
  create: (data: any) => Promise<Course>;
  getAll: () => Promise<Course[]>;
  delete: (id: number) => Promise<Course>;
};

export const useCourseStore = create<Store>()((set) => {
  const url = "/course";

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
    getAllCoursesByUserId: async (userId) =>
      (await axios.get(`${url}/user/${userId}`)).data,
    inviteByEmail: async (data) =>
      (await axios.post(`${url}/invite`, data)).data,
    findCourseById: async (id) => (await axios.get(`${url}/${id}`)).data,
    findPublicCourseById: async (id) =>
      (await axios.get(`${url}/public/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data,
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
  };
});
