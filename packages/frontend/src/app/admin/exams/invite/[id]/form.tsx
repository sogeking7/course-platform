"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error, inviteStudentToCourseSchema } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useCourseStore } from "@/store/course";
import { useExamStore } from "@/store/exam";

const placeholders = {
  email: "Почта",
};

export const AdminExamsInviteStudentsForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const examStore = useExamStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof inviteStudentToCourseSchema>>({
    resolver: zodResolver(inviteStudentToCourseSchema),
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: { emails: { email: string }[] }) => examStore.inviteUser(id, {...newData}),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      setError("root.serverError", {
        type: errorData.statusCode.toString(),
        message: errorData.message,
      });
    },
    onSuccess: () => {
      reset(getValues());
      reset({
        email: "",
      });
      queryClient.invalidateQueries({ queryKey: ["exam", { id }] });
    },
  });

  const onSubmit = (data: z.infer<typeof inviteStudentToCourseSchema>) => {
    const arr = [];
    arr.push({ email: data.email })
    const modData = { emails: arr };

    console.log(modData);
    mutation.mutate(modData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 items-start">
      <div className="w-[320px]">
        {(["email"] as const).map((field) => (
          <div key={field}>
            <Input placeholder={placeholders[field]} {...register(field)} />
            {errors[field] && (
              <span className="text-sm text-destructive">
                {errors[field]?.message}
              </span>
            )}
            {errors.root?.serverError.type && (
              <p className="text-sm text-destructive">
                {errors.root?.serverError.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <Button disabled={!isDirty} type="submit">
        {mutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Қосу
      </Button>
    </form>
  );
};
