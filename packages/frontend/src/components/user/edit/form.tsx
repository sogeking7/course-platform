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
import { PictureForm } from "@/components/picture-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const UserEditForm = () => {
  const { data: session, update, status } = useSession();
  const user = session?.user;
  const userStore = useUserStore();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => userStore.update(user?.id!, newData),
    onSuccess: (newUserData) => {
      update({
        ...session,
        user: {
          ...newUserData,
        },
      });
    },
  });

  const onSubmit = (data: z.infer<typeof editUserSchema>) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      form.reset(user);
    }
  }, [status, form.reset, user]);

  if (status === "loading") {
    return <div className="">Жүктелуде...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PictureForm
        uploadPhoto={userStore.uploadPhoto}
        entityData={{
          id: user?.id || 0,
          profilePictureLink: user?.profilePictureLink || "",
        }}
        cropShape="round"
        aspect={4 / 4}
        entityType="user"
        onSuccess={(newData: any) => mutation.mutate(newData)}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 w-full max-w-[320px] flex flex-col justify-center items-center"
        >
          <div className="space-y-3 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Аты</FormLabel>
                  <FormControl>
                    <Input placeholder="Аты" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тегі</FormLabel>
                  <FormControl>
                    <Input placeholder="Тегі" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input placeholder="Почта" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={!form.formState.isDirty} type="submit">
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Сақтау
          </Button>
        </form>
      </Form>
    </div>
  );
};
