"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error, createCourseSchema } from "@/types";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { useCourseStore } from "@/store/course";
import { useRouter } from "next/navigation";

const placeholders = {
  name: "Аты",
  description: "Cипаттамасы",
};

export const AdminUsersCreateForm = () => {
  const queryClient = useQueryClient();
  const courseStore = useCourseStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    criteriaMode: "all",
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => courseStore.create(newData),
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      setError("root.serverError", {
        type: errorData.statusCode.toString(),
        message: errorData.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] }), router.back();
    },
  });

  const onSubmit = (data: z.infer<typeof createCourseSchema>) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-5 bg-white border rounded-sm"
    >
      <div className="space-y-3 max-w-[320px]">
        {(["name", "description"] as const).map((field) => (
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
      {errors.root?.serverError && (
        <p className="text-xs text-destructive">
          {errors.root?.serverError.message}
        </p>
      )}
      <Button disabled={!isDirty || mutation.isSuccess} type="submit">
        {mutation.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Қосу
      </Button>
    </form>
  );
};
