"use client";

import { Bread } from "@/components/bread";
import { GoBackButton } from "@/components/go-back-button";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useExamStore } from "@/store/exam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminQuizResultsDataTable } from "./data-table";
import { columns } from "./columns";
import { WhiteBox } from "@/components/container";

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

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["exam-all-results", { id: examId }],
    queryFn: () => examStore.getAllResults(examId),
  });

  const mutation = useMutation({
    mutationFn: (newData: { email: string }) =>
      examStore.resetResultOfUser(examId, newData.email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam-all-results", { id: examId }],
      });
    },
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
      path:
        "/admin/courses/" +
        courseId +
        "/curriculum/section/lecture/" +
        lectureId +
        "/" +
        examId,
    },
    {
      name: `Results`,
      path:
        "/admin/courses/" +
        courseId +
        "/curriculum/section/lecture/" +
        lectureId +
        "/" +
        examId +
        "/results",
    },
  ];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Results Quiz: Lecture {lectureId}</TypographyH1>
      </div>
      <WhiteBox>
        <AdminQuizResultsDataTable
          columns={columns(mutation.mutate, examId)}
          data={data}
        />
      </WhiteBox>
    </>
  );
}
