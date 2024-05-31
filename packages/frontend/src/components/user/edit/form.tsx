"use client";

import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const placeholders = {
  firstName: "Аты",
  lastName: "Тегі",
  email: "Почта",
};

export const UserEditForm = () => {
  const { data: session, update, status } = useSession();
  const user = session?.user;
  const userStore = useUserStore();

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
    onSuccess: (newUserData) => {
      update(newUserData);
    },
  });

  const onSubmit = (data: z.infer<typeof editUserSchema>) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      reset(user);
    }
  }, [status, reset, user]);

  // if (status === "unauthenticated") {

  // }

  if (status === "loading") {
    return <div className="">Жүктелуде...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-5 w-full max-w-[320px] flex flex-col justify-center items-center"
    >
      <div className="space-y-3 w-full">
        {(["firstName", "lastName", "email"] as const).map((field) => (
          <div key={field}>
            <Input placeholder={placeholders[field]} {...register(field)} />
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
