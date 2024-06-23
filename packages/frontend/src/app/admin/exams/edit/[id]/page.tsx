"use client";

import { Bread } from "@/components/bread";
import { WhiteBox } from "@/components/container";
import { LayoutLoader } from "@/components/loader";
import { QuizCreator } from "@/components/quiz-creator";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { createQuestionSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { AdminUsersCreateForm } from "../../create/form";

export default function AdminsExamsEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const examStore = useExamStore();

  const { data: examQuestions, isLoading: isExamQuestionsLoading } = useQuery({
    queryKey: ["exam-questions", { id }],
    queryFn: () => examStore.getQuestions(id),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["exam", { id }],
    queryFn: () => examStore.getById(id),
  });

  if (isLoading || !data || isExamQuestionsLoading || !examQuestions) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [{ name: "Емтихандар", path: "/admin/exams" }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="w-full gap-4 justify-between flex">
        <TypographyH1>{data.name}</TypographyH1>
      </div>
      <WhiteBox>
        <div className="flex flex-wrap gap-4 justify-end">
          <Link href={"/admin/exams/invite/" + id}>
            <Button variant={"outline"}>
              <UserRoundPlus size={16} className="mr-2" />
              Оқушы қосу
            </Button>
          </Link>
          <Link href={"/admin/exams/results/" + id}>
            <Button>
              <ClipboardList size={16} className="mr-2" />
              Нәтижелер
            </Button>
          </Link>
        </div>

        <AdminUsersCreateForm data={data} mode="edit" />

        <div className="mt-6">
          {!!examQuestions.length && (
            <div className="flex flex-col gap-6 mb-6">
              {examQuestions.map((question, index) => {
                const modifiedQuestion: z.infer<typeof createQuestionSchema> & {
                  id: number;
                } = {
                  ...question,
                  id: parseInt(question.id as string),
                  options: question.options.map((o) => ({
                    value: o,
                    isTrue: question.correctAnswer.includes(o),
                  })),
                };
                return (
                  <QuizCreator
                    length={examQuestions.length}
                    examId={id}
                    key={question.id}
                    data={modifiedQuestion}
                    mode="edit"
                  />
                );
              })}
            </div>
          )}
        </div>
        <QuizCreator examId={id} mode="new" />
      </WhiteBox>
    </>
  );
}
