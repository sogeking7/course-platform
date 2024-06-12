"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error, createUserSchema } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const placeholders = {
  firstName: "Аты",
  lastName: "Тегі",
  email: "Почта",
  password: "Құпия сөз",
  repeatPassword: "Құпия сөзді қайталау",
};

export const AdminUsersCreateForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const authStore = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    criteriaMode: "all",
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => authStore.register(newData),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      setError("root.serverError", {
        type: errorData.statusCode.toString(),
        message: errorData.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }), router.back();
    },
  });

  const onSubmit = (data: z.infer<typeof createUserSchema>) => {
    const { repeatPassword, ...resgisterData } = data;
    mutation.mutate(resgisterData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-5 bg-white border rounded-sm"
    >
      <div className="space-y-3 max-w-[320px]">
        {(
          [
            "firstName",
            "lastName",
            "email",
            "password",
            "repeatPassword",
          ] as const
        ).map((field) => (
          <div key={field}>
            <Input
              type={
                ["password", "repeatPassword"].includes(field)
                  ? "password"
                  : "text"
              }
              placeholder={placeholders[field]}
              {...register(field)}
            />
            {errors[field] && (
              <span className="text-xs text-destructive">
                {errors[field]?.message}
              </span>
            )}
          </div>
        ))}
      </div>
      {errors.root?.serverError.type === "400" && (
        <p className="text-xs text-destructive">
          {errors.root?.serverError.message}
        </p>
      )}
      <Button disabled={!isDirty} type="submit">
        {mutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Қосу
      </Button>
    </form>
  );
};
