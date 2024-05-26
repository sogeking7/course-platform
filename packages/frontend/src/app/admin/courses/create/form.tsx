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
import { Tiptap } from "@/components/tip-tap";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const placeholders = {
  name: "Аты",
  description: "Cипаттамасы",
};

export const AdminCourseCreateForm = ({
  data = null,
  mode = "create",
}: {
  data?: any;
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
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "create") {
        return courseStore.create(newData);
      }
      return courseStore.update(Number(data.id), newData);
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
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] }), router.back();
    },
  });

  const onSubmit = (data: z.infer<typeof createCourseSchema>) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 p-5 bg-white border rounded-sm"
      >
        <div className="space-y-3 ">
          {(["name"] as const).map((field) => (
            <div key={field} className="w-full">
              <Input
                placeholder={placeholders[field]}
                {...form.register(field)}
              />
              {form.formState.errors[field] && (
                <span className="text-xs text-destructive">
                  {form.formState.errors[field]?.message}
                </span>
              )}
            </div>
          ))}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cипаттамасы</FormLabel>
                <FormControl>
                  <Tiptap
                    editorState={field.value}
                    setEditorState={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root?.serverError && (
          <p className="text-xs text-destructive">
            {form.formState.errors.root?.serverError.message}
          </p>
        )}
        <Button
          disabled={!form.formState.isDirty || mutation.isSuccess}
          type="submit"
        >
          {mutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {mode === "edit" ? "Өзгерту" : "Қосу"}
        </Button>
      </form>
    </Form>
  );
};
