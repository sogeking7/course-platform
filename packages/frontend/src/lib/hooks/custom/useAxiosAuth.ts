import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

export const useAxiosAuth = () => {
	const { data: session } = useSession();

	useEffect(() => {
		const requestIntercept = axiosAuth.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${session?.user.access_token}`
				}
				return config;
			}
		)
		return () => {
			axiosAuth.interceptors.request.eject(requestIntercept);
		}
	}, [session]);

	return axiosAuth;
}
