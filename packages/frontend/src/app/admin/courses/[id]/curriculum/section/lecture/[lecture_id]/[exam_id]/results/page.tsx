"use client";

import { Bread } from "@/components/bread";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminQuizResultsDataTable } from "./data-table";
import { columns } from "./columns";
import { WhiteBox } from "@/components/container";
import { useLectureStore } from "@/store/lecture";
import { calcPercentage } from "@/lib/utils";
import { ExamResult } from "@/types";

export default function AdminLectureQuizResults({
  params,
}: {
  params: {
    id: string;
    lecture_id: string;
    exam_id: string;
  };
}) {
  const queryClient = useQueryClient();

  const courseId = Number(params.id);
  const lectureId = Number(params.lecture_id);
  const examId = Number(params.exam_id);

  const examStore = useExamStore();
  const lectureStore = useLectureStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["exam-all-results", { id: examId }],
    queryFn: () => examStore.getAllResults(examId),
  });

  const { data: exam, isLoading: isExamLoading } = useQuery({
    queryKey: ["exam", { id: examId }],
    queryFn: () => examStore.getQuestions(examId),
  });

  const { data: lecture, isLoading: isLectureLoading } = useQuery({
    queryKey: ["lecture", { id: lectureId }],
    queryFn: () => lectureStore.getById(lectureId),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => examStore.resetResultOfUser(examId, email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam-all-results", { id: examId }],
      });
    },
  });

  if (isLoading || !data || isLectureLoading || !lecture) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    {
      name: ` ${lecture.name}`,
      path: "/admin/courses/" + courseId + "/curriculum",
    },
    {
      name: `Quiz`,
      path:
        "/admin/courses/" +
        courseId +
        "/curriculum/section/lecture/" +
        lectureId +
        "/" +
        examId,
    },
  ];

  const totalPoints = exam
    ? exam.reduce((sum, question) => sum + question.points, 0)
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
