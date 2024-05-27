"use client";

import { Bread } from "@/components/bread";
import { GoBackButton } from "@/components/go-back-button";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import { CourseSectionManager } from "./section/manager";

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

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    { name: "Курстар", path: "/admin/courses" },
    { name: data.name, path: "/admin/courses/" + id },
    { name: "Курс бағдарламасы", path: "/admin/courses/" + id + "/curriculum" },
  ];

  const test = {
    sections: [
      {
        id: 1,
        name: "Section 1",
        description: "Section 1 Description",
        lectures: [
          {
            id: 1,
            name: "Lecture 1",
            content: "Lecture 1 Content",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex">
        <GoBackButton />
        <TypographyH1>Курс бағдарламасы</TypographyH1>
      </div>
      <div className="border shadow-md rounded-sm py-12 px-12 bg-white">
        <CourseSectionManager courseId={data.id} sections={test.sections} />
      </div>
    </>
  );
}
