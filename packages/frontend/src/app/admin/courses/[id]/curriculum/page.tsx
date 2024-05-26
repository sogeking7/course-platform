"use client";

import { Bread } from "@/components/bread";
import { GoBackButton } from "@/components/go-back-button";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import CourseCurriculumManager from "./manager";

export default function AdminCoursesCurriculum({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const courseStore = useCourseStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["course", { id: Number(id) }],
    queryFn: () => courseStore.findCourseById(id),
  });

  if (isLoading) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    { name: "Курстар", path: "/admin/courses" },
    { name: data.name, path: "/admin/courses/" + id },
    { name: "Курс бағдарламасы", path: "/admin/courses/" + id + "/curriculum" },
  ];
  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex">
        <GoBackButton />
        <TypographyH1>Курс бағдарламасы</TypographyH1>
      </div>
      <div className="border shadow-md rounded-sm py-12 px-12 bg-white">
        <CourseCurriculumManager />
      </div>
    </>
  );
}
