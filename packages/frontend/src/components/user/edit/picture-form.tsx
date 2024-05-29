"use client";

import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { fileSchema } from "@/types";
import Image from "next/image";

export const UserPictureForm = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => userStore.findUserById(user?.id!),
    enabled: !!user?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const fileRef = register("file");

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      userStore.uploadPhoto(user?.id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
      reset(getValues());
    },
  });

  const onSubmit = (data: z.infer<typeof fileSchema>) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    mutation.mutate(formData);
  };

  if (isLoading || !userData) {
    return <div className="p-5 bg-white border rounded-sm">Жүктелуде...</div>;
  }

  return (
    <div className="p-5 bg-white border rounded-sm mb-6">
      <Image
        width={150}
        height={150}
        className="w-[150px] h-[150px] rounded-full mb-6"
        src={userData.profilePictureLink || ""}
        alt="User Profile Image"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 items-center"
      >
        <div>
          <Input
            className="py-2 !text-sm !leading-none w-[250px]"
            type="file"
            {...fileRef}
          />
          {errors.file && (
            <span className="text-xs text-destructive">
              {errors.file.message}
            </span>
          )}
        </div>
        <Button disabled={!isDirty || !isValid} type="submit">
          {mutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Сақтау
        </Button>
      </form>
    </div>
  );
};
