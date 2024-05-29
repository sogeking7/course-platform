"use client";

import { GoBackButton } from "@/components/go-back-button";
import { TypographyH1 } from "@/components/ui/typography";
import { AdminCourseCreateForm } from "../create/form";
import { useQuery } from "@tanstack/react-query";
import { useCourseStore } from "@/store/course";
import { LayoutLoader } from "@/components/loader";
import { Bread } from "@/components/bread";

export default function AdminCourseEditPage({
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

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    { name: "Курстар", path: "/admin/courses" },
    { name: data.name, path: "/admin/courses/" + id },
  ];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Курсты өңдеу </TypographyH1>
      </div>
      <AdminCourseCreateForm mode={"edit"} data={data} />
    </>
  );
}
