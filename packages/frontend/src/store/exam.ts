import axios from "@/lib/axios";
import { Exam, Question } from "@/types";
import { create } from "zustand";

type Store = {
  delete: (id: number) => Promise<Exam>;
  update: (id: number, data: any) => Promise<Exam>;
  create: (data: any) => Promise<Exam>;
  getAll: () => Promise<Exam[]>;
  getById: (id: number) => Promise<Exam>;
  getQuestions: (examId: number) => Promise<Question[]>;
  addQuestion: (examId: number, data: any) => Promise<any>;
  updateQuestion: (
    examId: number,
    questionId: number,
    data: any,
  ) => Promise<any>;
  deleteQuestion: (examId: number, questionId: number) => Promise<any>;
  checkAnswers: (examId: number, data: any) => Promise<any>;
  getUserResults: (examId: number) => Promise<any>;
  getAllResults: (examId: number) => Promise<any>;
  resetResultOfUser: (examId: number, userEmail: string) => Promise<any>;
  inviteUser: (data: any) => Promise<any>;
  getInvitedExams: (userId: number) => Promise<any>;
};

export const useExamStore = create<Store>()((set) => {
  const url = "/exam";

  return {
    delete: async (id) => (await axios.delete(`${url}/${id}`)).data,
    update: async (id, data) => (await axios.put(`${url}/${id}`, data)).data,
    create: async (data) => (await axios.post(`${url}`, data)).data,
    getAll: async () => (await axios.get(`${url}`)).data,
    getById: async (id) => (await axios.get(`${url}/${id}`)).data,
    getQuestions: async (examId) =>
      (await axios.get(`${url}/${examId}/questions`)).data,
    addQuestion: async (examId, data) =>
      (await axios.post(`${url}/${examId}/questions`, data)).data,
    updateQuestion: async (examId, questionId, data) =>
      (await axios.patch(`${url}/${examId}/questions/${questionId}`, data))
        .data,
    deleteQuestion: async (examId, questionId) =>
      (await axios.delete(`${url}/${examId}/questions/${questionId}`)).data,
    checkAnswers: async (examId, data) =>
      (await axios.post(`${url}/${examId}/check-answers`, data)).data,
    getUserResults: async (examId) =>
      (await axios.get(`${url}/${examId}/get-result-by-userId`)).data,
    getAllResults: async (examId) =>
      (await axios.get(`${url}/${examId}/get-result`)).data,
    resetResultOfUser: async (examId, userEmail) =>
      (await axios.delete(`${url}/${examId}/reset-result/${userEmail}`)).data,
    inviteUser: async (data) => (await axios.post(`${url}/invite`), data).data,
    getInvitedExams: async () => (await axios.get(`${url}/invite`)).data,
  };
});
