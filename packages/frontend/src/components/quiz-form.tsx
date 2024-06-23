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
  const examStore = useExamStore();

  const form = useForm({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: {
      questions,
    },
  });

  const { fields } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => examStore.checkAnswers(examId, newData),
  });

  const onSubmit = (data: z.infer<typeof QuizFormSchema>) => {
    const modifiedData = {
      answers: data.questions.map((d) => ({
        questionId: d.id,
        givenAnswers: [d.selectedOption],
      })),
    };
    mutation.mutate(modifiedData);
  };

  if (mutation.data) {
    const totalPoints = questions.reduce(
      (sum, question) => sum + question.points,
      0,
    );
    const percentage = calcPercentage(mutation.data.totalPoints, totalPoints);
    const result: QuizResult = {
      grade: percentage,
      points: mutation.data.totalPoints,
      state: "Аяқталды",
      createdAt: "",
      editedAt: ""
    };

    const modColumns = [...columns];
    modColumns[1].header = `Балл / ${totalPoints.toFixed(2)}`;
    modColumns[2].header = `Баға / ${Number(100).toFixed(2)}%`;

    return (
      <div>
        <TypographyH1>Нәтиже</TypographyH1>
        <LectureQuizResultsTable columns={modColumns} data={[result]} />
        <div className="flex w-full mt-6 justify-end">
          <Button onClick={router.back} variant={"outline"}>
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
                <FormLabel className="text-base whitespace-normal">
                  {index + 1 + ".  " + question.text}
                </FormLabel>
                <FormDescription>Біреуін таңдаңыз:</FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    {question.options.map((option, optIndex) => (
                      <FormItem
                        key={optIndex}
                        className="flex items-center space-x-4 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="text-base">
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
        <div className="w-full flex justify-end gap-4">
          {!mutation.data && <Button type="submit">Аяқтау</Button>}
        </div>
      </form>
    </Form>
  );
};
