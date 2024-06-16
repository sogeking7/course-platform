"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course, Error, createCourseSchema } from "@/types";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AxiosError } from "axios";
import { useCourseStore } from "@/store/course";
import { useRouter } from "next/navigation";
import { Tiptap } from "@/components/tip-tap";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleFadingPlus, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { PictureForm } from "@/components/picture-form";
import { WhiteBox } from "@/components/container";
import { MyAlert } from "@/components/my-alert";
import { Switch } from "@/components/ui/switch";

export const AdminCourseCreateForm = ({
  mode = "create",
  data,
}: {
  data?: Course;
  mode?: "create" | "edit";
}) => {
  const queryClient = useQueryClient();
  const courseStore = useCourseStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    criteriaMode: "all",
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      content: data?.content || "",
      content_checked: data?.content ? true : false,
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "create") {
        return courseStore.create(newData);
      }
      return courseStore.update(Number(data?.id!), newData);
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      form.setError("root.serverError", {
        type: errorData.statusCode.toString(),
        message: errorData.message,
      });
    },
    onSuccess: (data) => {
      if (mode === "edit") {
        queryClient.setQueryData(["course", { id: data.id }], data);
        form.reset(form.getValues());
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] }), router.back();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) => courseStore.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.removeQueries({
        queryKey: ["course", { id: data?.id! }],
      });
      router.push("/admin/courses");
    },
  });

  const onSubmit = (data: z.infer<typeof createCourseSchema>) => {
    const { content_checked, ...edited } = data;
    edited.content = content_checked ? edited.content : "";
    mutation.mutate(edited);
  };

  return (
    <WhiteBox>
      <div className="flex justify-between flex-wrap gap-6">
        {mode === "edit" && (
          <PictureForm
            uploadPhoto={courseStore.uploadPhoto}
            entityData={{
              id: data?.id || 0,
              coursePictureLink: data?.profilePictureLink || "",
            }}
            aspect={240 / 135}
            cropShape="rect"
            entityType="course"
            onSuccess={(newData: any) => {
              queryClient.setQueryData(["course", { id: data?.id! }], newData);
            }}
          />
        )}

        {mode === "edit" && (
          <div className="mb-4 flex gap-4 flex-wrap justify-end">
            <Link href={`/admin/courses/${data?.id!}/curriculum`}>
              <Button variant={"outline"}>
                <CircleFadingPlus className="mr-2" size={20} />
                Курс бағдарламасы
              </Button>
            </Link>
            <Link href={`/admin/courses/${data?.id!}/invite`}>
              <Button variant={"outline"}>
                <UserRoundPlus className="mr-2" size={20} />
                Оқушы қосу
              </Button>
            </Link>
            {/* <Link href={`/admin/courses/${data.id}`}>
              <Button variant={"outline"}>
                <Pencil className="mr-2" size={20} />
                Өңдеу
              </Button>
            </Link> */}
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
          <div className="space-y-3 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Аты</FormLabel>
                  <FormControl>
                    <Input placeholder="Аты" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cипаттамасы</FormLabel>
                  <FormControl>
                    <Input placeholder="Cипаттамасы" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <hr className="border-none" />
            <FormField
              control={form.control}
              name="content_checked"
              render={({ field }) => (
                <div className="border-neutral-300 border rounded-xl p-4 flex flex-col gap-4">
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Контент қосу</FormLabel>
                      <FormDescription>Текст</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                  {form.getValues("content_checked") && (
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Контент</FormLabel> */}
                          <FormControl>
                            <Tiptap
                              placeholder={"Контент"}
                              editorState={field.value || ""}
                              setEditorState={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            />
          </div>
          {form.formState.errors.root?.serverError && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root?.serverError.message}
            </p>
          )}
          <div className="flex w-full justify-end gap-4">
            {mode === "edit" && (
              <MyAlert
                name={data?.name!}
                id={data?.id!}
                mutation={mutationDelete}
              />
            )}
            <Button disabled={!form.formState.isDirty} type="submit">
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {mode === "edit" ? "Өзгерту" : "Қосу"}
            </Button>
          </div>
        </form>
      </Form>
    </WhiteBox>
  );
};
