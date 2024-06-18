"use client";

import { Bread } from "@/components/bread";
import { MyContainer, WhiteBox } from "@/components/container";
import { LayoutLoader } from "@/components/loader";
import { QuizForm } from "@/components/quiz-form";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { Question, QuizFormSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function ClientQuizPage({
  params,
}: {
  params: {
    id: string;
    lecture_id: string;
  };
}) {
  const router = useRouter();

  const lecture_id = Number(params.lecture_id);
  const course_id = Number(params.id);

  const lectureStore = useLectureStore();
  const examStore = useExamStore();

  const { data: lecture, isLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => lectureStore.getById(lecture_id),
  });

  const { data: examResults, isLoading: examResultsLoading } = useQuery({
    queryKey: ["exam-results", { id: lecture?.exam?.id }],
    queryFn: () => examStore.getUserResults(lecture?.exam?.id!),
    enabled: !!lecture?.exam?.id,
  });

  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: ["exam", { id: lecture?.exam?.id }],
    queryFn: () => examStore.getQuestions(lecture?.exam?.id!),
    enabled: !!(examResults?.result === null),
  });

  if (isLoading || !lecture) {
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

  if (examResults?.result) {
    return (
      <div className="w-full h-full">
        <MyContainer>
          <Bread breadcrumbs={breadcrumbs} />
          <TypographyH1>Quiz: {lecture.name}</TypographyH1>
          <WhiteBox>
            <>
              Сіз quiz-ды өттіңіз
              <div className="flex w-full mt-6 justify-end">
                <Button onClick={router.back} variant={"outline"}>
                  Артқа қайту
                </Button>
              </div>
            </>
          </WhiteBox>
        </MyContainer>
      </div>
    );
  }

  if (examResults?.result === null && (!exam || exam.length === 0)) {
    return (
      <div className="w-full h-full">
        <MyContainer>
          <Bread breadcrumbs={breadcrumbs} />
          <TypographyH1>Quiz: {lecture.name}</TypographyH1>
          <WhiteBox>
            <>
              Cұрақтар жоқ
              <div className="flex w-full mt-6 justify-end">
                <Button onClick={router.back} variant={"outline"}>
                  Артқа қайту
                </Button>
              </div>
            </>
          </WhiteBox>
        </MyContainer>
      </div>
    );
  }

  const formattedQuestions: z.infer<typeof QuizFormSchema>["questions"] = exam
    ? exam.map((question: Question) => ({
        id: parseInt(question.id as string),
        text: question.text,
        points: question.points,
        isMultipleChoice: question.isMultipleChoice,
        options: question.options.map((o: any) => ({
          value: o,
          isTrue: question.correctAnswer.includes(o),
        })),
        selectedOption: "",
      }))
    : [];

  const examId = lecture.exam?.id!;

  return (
    <div className="w-full h-full">
      <MyContainer>
        <Bread breadcrumbs={breadcrumbs} />
        <TypographyH1>Quiz: {lecture.name}</TypographyH1>
        <WhiteBox>
          <QuizForm examId={examId} questions={formattedQuestions} />
        </WhiteBox>
      </MyContainer>
    </div>
  );
}
