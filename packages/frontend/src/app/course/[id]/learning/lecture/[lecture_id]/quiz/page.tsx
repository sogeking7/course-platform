"use client";

import { Bread } from "@/components/bread";
import { MyContainer } from "@/components/container";
import { GoBackButton } from "@/components/go-back-button";
import { LayoutLoader } from "@/components/loader";
import { QuizForm } from "@/components/quiz-form";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { Question, QuizFormSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function ClientQuizPage({
  params,
}: {
  params: {
    id: string;
    lecture_id: string;
  };
}) {
  const lecture_id = Number(params.lecture_id);
  const course_id = Number(params.id);

  const lectureStore = useLectureStore();
  const examStore = useExamStore();

  const { data: lecture, isLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => lectureStore.getById(lecture_id),
  });

  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: ["exam", { id: lecture?.exam?.id }],
    queryFn: () => examStore.getQuestions(lecture?.exam?.id!),
    enabled: !!lecture?.exam?.id,
  });

  if (isExamLoading || isLoading || !lecture) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    {
      name: lecture.name,
      path: `/course/${course_id}/learning/lecture/${lecture_id}`,
    },
    {
      name: "Quiz",
      path: `/course/${course_id}/learning/lecture/${lecture_id}/quiz`,
    },
  ];

  const formattedQuestions: z.infer<typeof QuizFormSchema>["questions"] =
    exam.map((question: Question) => ({
      id: parseInt(question.id as string),
      text: question.text,
      points: question.points,
      isMultipleChoice: question.isMultipleChoice,
      options: question.options.map((o: any) => ({
        value: o,
        isTrue: question.correctAnswer.includes(o),
      })),
      selectedOption: "",
    }));

  const examId = lecture.exam?.id!;

  if (!exam || exam.length === 0) {
    return (
      <div className="w-full h-full">
        <MyContainer>
          <Bread breadcrumbs={breadcrumbs} />
          <div className="flex items-start">
            <GoBackButton />
            <TypographyH1>Quiz: {lecture.name}</TypographyH1>
          </div>
          <div className="border bg-white rounded-sm p-6">
            0 Cұрақтар
          </div>
        </MyContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MyContainer>
        <Bread breadcrumbs={breadcrumbs} />
        <div className="flex items-start">
          <GoBackButton />
          <TypographyH1>Quiz: {lecture.name}</TypographyH1>
        </div>
        <div className="border bg-white rounded-sm p-6">
          <QuizForm examId={examId} questions={formattedQuestions} />
        </div>
      </MyContainer>
    </div>
  );
}
