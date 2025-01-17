"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exam, createExamSchema } from "@/types";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useExamStore } from "@/store/exam";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type Props = {
  data?: Exam;
  mode?: "edit" | "new";
};

export const AdminUsersCreateForm = ({ data, mode = "new" }: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const examStore = useExamStore();

  const form = useForm<z.infer<typeof createExamSchema>>({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "null",
      lectureId: 0,
      questions: data?.questions || "[]",
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "new") {
        console.log(newData);
        return examStore.create(newData);
      }
      return examStore.update(data?.id!, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", { id: data?.id! }] });
      form.reset(form.getValues());
      if (mode !== "edit") {
        router.back();
      }
    },
  });

  const onSubmit = (data: z.infer<typeof createExamSchema>) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

        {/* !!! NO DESCRIPTION !!! */}

        {/* <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сипаттамасы</FormLabel>
              <FormControl>
                <Input placeholder="Сипаттамасы" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}

        {form.formState.isDirty && (
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => form.reset()}
            >
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
    </Form>
  );
};
