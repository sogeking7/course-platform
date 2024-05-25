"use client";

import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";

export const UserEditForm = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  const {
    data: userData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userStore.findUserById(user?.id!),
    enabled: !!user?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => userStore.update(user?.id!, newData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] }),
  });

  useEffect(() => {
    if (isSuccess && userData) {
      reset(userData);
    }
  }, [isSuccess, userData, reset]);

  const onSubmit = (data: z.infer<typeof editUserSchema>) =>
    mutation.mutate(data);

  if (isLoading || !userData || !isSuccess) {
    return <div className="p-5 bg-white border rounded-sm">Жүктелуде...</div>;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-5 bg-white border rounded-sm"
    >
      <div className="space-y-3 max-w-[320px]">
        {(["firstName", "lastName", "email"] as const).map((field) => (
          <div key={field}>
            <Input
              placeholder={
                field === "firstName"
                  ? "Аты"
                  : field === "lastName"
                    ? "Тегі"
                    : "Почта"
              }
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
      <Button disabled={!isDirty} type="submit">
        {mutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Сақтау
      </Button>
    </form>
  );
};
