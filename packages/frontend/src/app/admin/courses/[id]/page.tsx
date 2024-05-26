"use client";

import { GoBackButton } from "@/components/go-back-button";
import { TypographyH1 } from "@/components/ui/typography";
import { AdminCourseCreateForm } from "../create/form";
import { useQuery } from "@tanstack/react-query";
import { useCourseStore } from "@/store/course";
import { LayoutLoader } from "@/components/loader";

export default function AdminCourseEditPage({ params }) {
  const { id } = params;
  const courseStore = useCourseStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["course", { id: Number(id) }],
    queryFn: () => courseStore.findCourseById(id),
  });

  if (isLoading) {
    return <LayoutLoader />;
  }

  return (
    <>
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Курс {id} </TypographyH1>
      </div>
      <AdminCourseCreateForm mode={"edit"} data={data} />
    </>
  );
}
