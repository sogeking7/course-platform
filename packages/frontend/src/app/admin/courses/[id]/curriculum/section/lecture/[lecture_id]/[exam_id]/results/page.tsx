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

  const { data: lecture, isLoading: isLectureLoading } = useQuery({
    queryKey: ["lecture", { id: lectureId }],
    queryFn: () => lectureStore.getById(lectureId),
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

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Results</TypographyH1>
      <WhiteBox>
        <AdminQuizResultsDataTable columns={columns(mutation)} data={data} />
      </WhiteBox>
    </>
  );
}
