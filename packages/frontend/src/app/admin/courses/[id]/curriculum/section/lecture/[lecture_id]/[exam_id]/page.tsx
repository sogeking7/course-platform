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
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

export default function AdminLecturePage({
  params,
}: {
  params: {
    id: string;
    lecture_id: string;
    exam_id: string;
  };
}) {
  const courseId = Number(params.id);
  const lectureId = Number(params.lecture_id);
  const examId = Number(params.exam_id);

  const examStore = useExamStore();
  const lectureStore = useLectureStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["exam-questions", { id: examId }],
    queryFn: () => examStore.getQuestions(examId),
  });

  const { data: lecture, isLoading: isLectureLoading } = useQuery({
    queryKey: ["lecture", { id: lectureId }],
    queryFn: () => lectureStore.getById(lectureId),
  });

  if (isLoading || !data || !lecture || isLectureLoading) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    {
      name: ` ${lecture.name}`,
      path: "/admin/courses/" + courseId + "/curriculum",
    },
  ];

  // const questions: Question[] = JSON.parse(
  //   data.exam?.questions as unknown as string,
  // );

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="w-full justify-between flex">
        <TypographyH1>Quiz</TypographyH1>
        <Link
          href={
            "/admin/courses/" +
            courseId +
            "/curriculum/section/lecture/" +
            lectureId +
            "/" +
            examId +
            "/results"
          }
        >
          <Button>
            <ClipboardList size={16} className="mr-2" />
            Нәтижелер
          </Button>
        </Link>
      </div>
      <div className="sm:p-6 mt-3 sm:border sm:bg-white rounded-3xl sm:shadow-sm mb-6">
        {!!data.length && (
          <div className="flex flex-col gap-6 mb-6">
            {data.map((question, index) => {
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
                  length={data.length}
                  examId={examId}
                  key={question.id}
                  data={modifiedQuestion}
                  mode="edit"
                />
              );
            })}
          </div>
        )}
        <QuizCreator examId={examId} lectureId={lectureId} mode="new" />
      </div>
    </>
  );
}
