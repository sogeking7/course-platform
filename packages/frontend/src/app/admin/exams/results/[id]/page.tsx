"use client";

import { LayoutLoader } from "@/components/loader";
import { useExamStore } from "@/store/exam";
import { ExamResult, Question } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { columns } from "./columns";
import { calcPercentage } from "@/lib/utils";
import { Bread } from "@/components/bread";
import { TypographyH1 } from "@/components/ui/typography";
import { WhiteBox } from "@/components/container";
import { AdminQuizResultsDataTable } from "./data-table";

export default function AdminExamsResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  const queryClient = useQueryClient();

  const examStore = useExamStore();

  const { data, isLoading } = useQuery({
    queryKey: ["exam-all-results", { id: id }],
    queryFn: () => examStore.getAllResults(id),
  });

  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: ["exam", { id: id }],
    queryFn: () => examStore.getById(id),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => examStore.resetResultOfUser(id, email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam-all-results", { id }],
      });
    },
  });

  if (isLoading || !data || isExamLoading || !exam) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    {
      name: "Емтихандар",
      path: `/admin/exams`,
    },
    {
      name: exam.name,
      path: `/admin/exams/edit/${id}`,
    },
  ];

  const totalPoints = exam
    ? JSON.parse(exam.questions).reduce(
        (sum: number, question: Question) => sum + question.points,
        0,
      )
    : null;

  const modColumns = [...columns(mutation)];
  modColumns[4].header = `Балл / ${totalPoints?.toFixed(2)}`;
  modColumns[5].header = `Баға / ${Number(100).toFixed(2)}%`;

  const modifiedData = data.map((x: ExamResult) => ({
    ...x,
    grade: calcPercentage(x.examResult, totalPoints || 0),
    points: x.examResult,
  }));

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Нәтижелер</TypographyH1>
      {/* <WhiteBox> */}
      <AdminQuizResultsDataTable columns={modColumns} data={modifiedData} />
      {/* </WhiteBox> */}
    </>
  );
}
