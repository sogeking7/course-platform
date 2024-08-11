"use client";

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

  const breadcrumbs = [{ name: " Курстар", path: "/admin/courses" }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>{data.name} </TypographyH1>
      <AdminCourseCreateForm mode={"edit"} data={data} />
    </>
  );
}
