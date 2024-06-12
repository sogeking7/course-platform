"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QuizFormSchema, QuizResult } from "@/types";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { useExamStore } from "@/store/exam";
import { calcPercentage } from "@/lib/utils";
import { LectureQuizResultsTable } from "@/app/course/[id]/learning/lecture/[lecture_id]/quiz/result-table";
import { columns } from "@/app/course/[id]/learning/lecture/[lecture_id]/quiz/columns";
import { TypographyH1 } from "./ui/typography";
import { useRouter } from "next/navigation";
import { kazakhVariants } from "../../public/shared";

type Props = {
  examId: number;
  questions: z.infer<typeof QuizFormSchema>["questions"];
};

export const QuizForm = ({ examId, questions }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const examStore = useExamStore();

  const form = useForm({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      questions: questions,
    },
  });

  const { fields } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => examStore.checkAnswers(examId, newData),
    onSuccess: (res) => {
      // console.log("res", res);
    },
  });

  const onSubmit = (data: z.infer<typeof QuizFormSchema>) => {
    const modifiedData = {
      answers: data.questions.map((d) => ({
        questionId: d.id,
        givenAnswers: [d.selectedOption],
      })),
    };
    // console.log("modifiedData", modifiedData);
    mutation.mutate(modifiedData);
  };

  if (mutation.data) {
    const x = calcPercentage(mutation.data.totalPoints, fields.length);
    const r: QuizResult = {
      grade: x,
      points: mutation.data.totalPoints,
      state: "Аяқталды",
    };

    const modColumns = [...columns];
    modColumns[1].header = `Балл / ${fields.length.toFixed(2)}`;
    modColumns[2].header = `Баға / ${Number(100).toFixed(2)}%`;

    return (
      <div>
        <TypographyH1>Нәтиже</TypographyH1>
        <LectureQuizResultsTable columns={modColumns} data={[r]} />
        <div className="flex w-full mt-6 justify-end">
          <Button onClick={handleGoBack} variant={"outline"}>
            Артқа қайту
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        {fields.map((question, index) => (
          <FormField
            key={question.id}
            control={form.control}
            name={`questions.${index}.selectedOption`}
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base">
                  {index + 1 + ".  " + question.text}
                </FormLabel>
                <FormDescription>Біреуін таңдаңыз:</FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value} // Ensure the value is controlled
                    className="flex flex-col space-y-3"
                  >
                    {question.options.map((option, optIndex) => (
                      <FormItem
                        key={optIndex}
                        className="flex items-center space-x-4 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {kazakhVariants[optIndex]} {option.value}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {/* {JSON.stringify(form.formState.errors)} */}
        <div className="w-full flex justify-end gap-4">
          {!mutation.data && <Button type="submit">Аяқтау</Button>}
        </div>
      </form>
    </Form>
  );
};
