import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
