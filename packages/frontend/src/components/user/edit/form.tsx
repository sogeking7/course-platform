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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const UserEditForm = () => {
  const { data: session, update, status } = useSession();
  const user = session?.user;
  const userStore = useUserStore();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
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
    <div className="flex flex-col gap-5 py-5">
      {user && (
        <div className="w-full flex justify-center">
          <Avatar className="!w-32 !h-32 md:!w-40 md:!h-40">
            <AvatarImage src={""} />
            <AvatarFallback className="!text-4xl md:!text-5xl">
              {user.firstName.charAt(0) + user.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      {/* <PictureForm
        uploadPhoto={userStore.uploadPhoto}
        entityData={{
          id: user?.id || 0,
          profilePictureLink: user?.profilePictureLink || "",
        }}
        cropShape="round"
        aspect={4 / 4}
        entityType="user"
        onSuccess={(newData: any) => mutation.mutate(newData)}
      /> */}
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
          {form.formState.isDirty && (
            <div className="flex w-full gap-4 mt-4">
              <Button
                className="w-1/2"
                variant={"outline"}
                onClick={() => form.reset()}
              >
                Болдырмау
              </Button>
              <Button className="w-1/2" type="submit">
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Сақтау
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
