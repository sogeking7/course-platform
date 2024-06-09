import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAxiosAuth = () => {
  const { data: session } = useSession();

  // console.log("TOKEN=", session?.user?.access_token);
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] =
          `Bearer ${session?.user.access_token}`;
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  // return axios;
};
