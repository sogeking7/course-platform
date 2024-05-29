"use client";

import { LayoutLoader } from "@/components/loader";
import { AdminCoursesInviteStudentsForm } from "./form";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { AdminUsersDataTable } from "@/app/admin/users/data-table";
import { columns } from "@/app/admin/users/columns";
import { GoBackButton } from "@/components/go-back-button";
import { Bread } from "@/components/bread";

export default function AdminCourseInviteStudentPage({
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

  const users_list = data.users?.map((x: any) => {
    const y = x.user;
    return { ...y };
  }) || [];

  const breadcrumbs = [
    { name: "Курстар", path: "/admin/courses" },
    { name: data.name, path: "/admin/courses/" + id },
    { name: "Оқушы қосу", path: "/admin/courses/" + id + "/invite" },
  ];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex">
        <GoBackButton />
        <TypographyH1>Оқушы қосу</TypographyH1>
      </div>
      <div className="p-5 border bg-white rounded-sm shadow-md">
        {/* <label>Курс аты:</label>
        <TypographyH3>{data.name}</TypographyH3> */}
        <div className=" flex-col flex gap-6">
          <AdminUsersDataTable columns={columns} data={users_list} />
          <AdminCoursesInviteStudentsForm courseId={data.id} />
        </div>
      </div>
    </>
  );
}
