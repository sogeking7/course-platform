import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuestionSchema } from "@/types";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useExamStore } from "@/store/exam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MyAlert } from "./my-alert";
import { Textarea } from "./ui/textarea";

export const QuizCreator = ({
  lectureId,
  examId,
  length,
  mode,
  data,
}: {
  length?: number;
  lectureId?: number;
  examId?: number;
  data?: z.infer<typeof createQuestionSchema> & { id: number };
  mode: "edit" | "new";
}) => {
  const queryClient = useQueryClient();
  const examStore = useExamStore();

  const form = useForm<z.infer<typeof createQuestionSchema>>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      text: data?.text || "",
      options: data?.options || [],
      isMultipleChoice: data?.isMultipleChoice || false,
      points: data?.points || 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "edit") {
        return examStore.updateQuestion(examId!, data?.id!, newData);
      }
      return examStore.addQuestion(examId!, newData);
    },
    onSuccess: () => {
      if (mode === "edit") {
        queryClient.invalidateQueries({ queryKey: ["exam", { id: examId! }] });
        form.reset(form.getValues());
      } else {
        queryClient.invalidateQueries({ queryKey: ["exam", { id: examId! }] });
        form.reset();
      }
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: number) => examStore.deleteQuestion(examId!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam", { id: examId! }],
      });
    },
  });

  const onSubmit = (data: z.infer<typeof createQuestionSchema>) => {
    const modifiedData = {
      ...data,
      options: data.options.map((o) => o.value),
      correctAnswer: [data.options.find((x) => x.isTrue)?.value!],
    };
    // console.log(modifieQuizFormSchemadData);
    mutation.mutate(modifiedData);
  };

  const isMultipleChoice = form.watch("isMultipleChoice");

  return (
    <div className="w-full flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border w-full bg-white border-neutral-300 rounded-2xl p-4 space-y-3"
        >
          <div className="w-full flex gap-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Сурақ</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Сурақ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem className="w-[100px]">
                  <FormLabel>Балл</FormLabel>
                  <FormControl>
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="Балл"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="options"
            render={() => (
              <FormItem>
                {/* <FormLabel>Options</FormLabel> */}
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="w-5 h-5 mr-1"
                        {...form.register(`options.${index}.isTrue`, {
                          required: !isMultipleChoice,
                        })}
                        defaultChecked={item.isTrue}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        placeholder={`Вариант ${index + 1}`}
                        {...form.register(`options.${index}.value`, {
                          required: true,
                        })}
                        defaultValue={item.value}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size={"icon"}
                      onClick={() => remove(index)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}
                <div className="pt-2">
                  {fields.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        append({
                          value: "",
                          isTrue: false,
                        });
                      }}
                    >
                      <Plus size={20} className="mr-2" /> Вариант
                    </Button>
                  )}
                </div>
                {form.formState.errors.options?.root?.message && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.options?.root?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <div className="w-full justify-end flex gap-4">
            {mode === "edit" && length && length > 1 && (
              <MyAlert
                mutation={mutationDelete}
                name={data?.text!}
                id={data?.id!}
              />
            )}
            <Button
              type="submit"
              disabled={mode === "new" ? false : !form.formState.isDirty}
            >
              {mode === "new" ? "Қосу" : "Өзгерту"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
