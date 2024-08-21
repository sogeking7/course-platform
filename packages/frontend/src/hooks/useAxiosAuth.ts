import axios from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAxiosAuth = () => {
  const { data: session } = useSession();
  const authStore = useAuthStore();

  const mutation = useMutation({
    mutationFn: (token: string) => authStore.validate(token),
    onSuccess: () => {},
    onError: () => {
      signOut();
    },
  });

  // console.log("TOKEN=", session?.user?.access_token);
  useEffect(() => {
    // if (session?.user) {
    if (session?.user.access_token) {
      mutation.mutate(session?.user.access_token!);
    }
    const requestIntercept = axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] =
          `Bearer ${session?.user.access_token}`;
      }
      return config;
    });
    // }
    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [mutation, session]);

  // return axios;
};
