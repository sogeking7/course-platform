"use client";

import { columns } from "@/app/course/[id]/learning/lecture/[lecture_id]/quiz/columns";
import { LectureQuizResultsTable } from "@/app/course/[id]/learning/lecture/[lecture_id]/quiz/result-table";
import { Bread } from "@/components/bread";
import { MyContainer, WhiteBox } from "@/components/container";
import { LayoutLoader } from "@/components/loader";
import { QuizForm } from "@/components/quiz-form";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { calcPercentage } from "@/lib/utils";
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
  };
}) {
  const router = useRouter();

  const id = Number(params.id);

  const lectureStore = useLectureStore();
  const examStore = useExamStore();

  const { data: examResults, isLoading: examResultsLoading } = useQuery({
    queryKey: ["exam-results", { id }],
    queryFn: () => examStore.getUserResults(id),
  });

  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: ["exam", { id }],
    queryFn: () => examStore.getById(id),
    // enabled: !!(examResults?.result === null),
  });

  const { data: examQuestions, isLoading: isExamQuestionsLoading } = useQuery({
    queryKey: ["exam-questions", { id }],
    queryFn: () => examStore.getQuestions(id),
  });

  if (
    examResultsLoading ||
    !examResults ||
    isExamLoading ||
    !exam ||
    isExamQuestionsLoading ||
    !examQuestions
  ) {
    return <LayoutLoader />;
  }

  let points = 0;
  if (exam) {
    let sum = 0;
    const questions: Question[] = JSON.parse(exam.questions);

    for (let x of examQuestions) {
      sum += x.points;
    }

    points = sum;
  }

  const breadcrumbs = [{ name: "Емтихандар", path: "/home/my-exams" }];

  if (examResults?.result) {
    return (
      <>
        <Bread breadcrumbs={breadcrumbs} />
        <TypographyH1>{exam.name}</TypographyH1>
        <WhiteBox>
          {!!(examResults.result !== null) && (
            <LectureQuizResultsTable
              columns={[
                { ...columns[0] },
                {
                  ...columns[1],
                  header: `Балл / ${points.toFixed(2)}`,
                },
                {
                  ...columns[2],
                  header: `Баға / ${Number(100).toFixed(2)}%`,
                },
              ]}
              data={[
                {
                  grade: calcPercentage(examResults.result, points),
                  points: examResults.result,
                  state: "Аяқталды",
                  createdAt: "",
                  editedAt: "",
                },
              ]}
            />
          )}
          <>
            {/* Сіз quiz-ды өттіңіз */}
            <div className="flex w-full mt-6 justify-end">
              <Button onClick={router.back} variant={"outline"}>
                Артқа қайту
              </Button>
            </div>
          </>
        </WhiteBox>
      </>
    );
  }

  if (
    examResults?.result === null &&
    (!examQuestions || examQuestions.length === 0)
  ) {
    return (
      <div className="w-full h-full">
        <MyContainer>
          <Bread breadcrumbs={breadcrumbs} />
          <TypographyH1>{exam.name}</TypographyH1>
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
    ? examQuestions.map((question: Question) => ({
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

  return (
    <div className="w-full h-full">
      <MyContainer>
        <Bread breadcrumbs={breadcrumbs} />
        <TypographyH1>{exam.name}</TypographyH1>
        <WhiteBox>
          <QuizForm examId={id} questions={formattedQuestions} />
        </WhiteBox>
      </MyContainer>
    </div>
  );
}
