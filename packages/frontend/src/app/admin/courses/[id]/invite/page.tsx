"use client";

import { LayoutLoader } from "@/components/loader";
import { AdminCoursesInviteStudentsForm } from "./form";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { AdminUsersDataTable } from "@/app/admin/users/data-table";
import { columns } from "@/app/admin/users/columns";
import { Bread } from "@/components/bread";
import { WhiteBox } from "@/components/container";

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

  const users_list =
    data.users?.map((x: any) => {
      const y = x.user;
      return { ...y };
    }) || [];

  const breadcrumbs = [{ name: ` ${data.name}`, path: "/admin/courses/" + id }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Оқушы қосу</TypographyH1>
      <WhiteBox>
        <div className=" flex-col flex gap-6">
          <AdminUsersDataTable columns={columns()} data={users_list} />
          <AdminCoursesInviteStudentsForm courseId={data.id} />
        </div>
      </WhiteBox>
    </>
  );
}
