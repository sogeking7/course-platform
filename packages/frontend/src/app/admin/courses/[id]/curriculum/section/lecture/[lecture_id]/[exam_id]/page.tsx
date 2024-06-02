"use client";

import { Bread } from "@/components/bread";
import { GoBackButton } from "@/components/go-back-button";
import { LayoutLoader } from "@/components/loader";
import { QuizCreator } from "@/components/quiz-creator";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { Question, createQuestionSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
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

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["exam", { id: examId }],
    queryFn: () => examStore.getQuestions(examId),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    { name: "Курстар", path: "/admin/courses" },
    // { name: data.section?.course?.name!, path: "/admin/courses/" + courseId },
    {
      name: "Курс бағдарламасы",
      path: "/admin/courses/" + courseId + "/curriculum",
    },
    {
      name: `Quiz: Lecture ${lectureId}`,
      path: "/admin/courses/" + courseId + "/curriculum",
    },
  ];

  // const questions: Question[] = JSON.parse(
  //   data.exam?.questions as unknown as string,
  // );

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Quiz: Lecture {lectureId}</TypographyH1>
      </div>
      <div className="border p-5 bg-white rounded-sm">
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
        <QuizCreator examId={examId} lectureId={lectureId} mode="new" />
      </div>
    </>
  );
}
