"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error, User, createUserSchema } from "@/types";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/user";

const placeholders = {
  firstName: "Аты",
  lastName: "Тегі",
  email: "Почта",
  password: "Құпия сөз",
  repeatPassword: "Құпия сөзді қайталау",
};

export const AdminUsersCreateForm = ({
  mode = "create",
  data,
}: {
  data?: User;
  mode?: "create" | "edit";
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();

  const userStore = useUserStore();
  const authStore = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    criteriaMode: "all",
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      password: data?.password ? "qwerty123" : "",
      repeatPassword: data?.password ? "qwerty123" : "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "edit" && data) {
        return userStore.update(data.id, newData);
      }
      return authStore.register(newData);
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      if (mode === "create") {
        setError("root.serverError", {
          type: errorData.statusCode.toString(),
          message: errorData.message,
        });
      }
    },
    onSuccess: (data) => {
      if (mode === "edit") {
        queryClient.setQueryData(["user", { id: data.id }], data);
        reset(getValues());
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.back();
    },
  });

  const onSubmit = (data: z.infer<typeof createUserSchema>) => {
    const { repeatPassword, ...resgisterData } = data;
    if (mode === "edit") {
      const editData: Omit<
        z.infer<typeof createUserSchema>,
        "password" | "repeatPassword"
      > = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
      mutation.mutate(editData);
    }
    mutation.mutate(resgisterData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-5 bg-white border rounded-lg"
    >
      <div className="space-y-3 max-w-[320px]">
        {(
          [
            "firstName",
            "lastName",
            "email",
            mode === "create" ? "password" : "",
            mode === "create" ? "repeatPassword" : "",
          ] as const
        ).map((field) => {
          if (field) {
            return (
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
                  <span className="text-sm text-destructive">
                    {errors[field]?.message}
                  </span>
                )}
              </div>
            );
          }
        })}
      </div>
      {errors.root?.serverError.type === "400" && (
        <p className="text-sm text-destructive">
          {errors.root?.serverError.message}
        </p>
      )}
      {isDirty && (
        <div className="flex gap-4">
          <Button variant={"outline"} onClick={() => reset()}>
            Болдырмау
          </Button>
          <Button type="submit">
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Сақтау
          </Button>
        </div>
      )}
    </form>
  );
};
