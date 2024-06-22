"use client";

import { LayoutLoader } from "@/components/loader";
import { AdminExamsInviteStudentsForm } from "./form";
import { useQuery } from "@tanstack/react-query";
import { TypographyH1 } from "@/components/ui/typography";
import { AdminUsersDataTable } from "@/app/admin/users/data-table";
import { columns } from "@/app/admin/users/columns";
import { Bread } from "@/components/bread";
import { WhiteBox } from "@/components/container";
import { useExamStore } from "@/store/exam";

export default function AdminExamsInviteStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const examStore = useExamStore();

  const { data, isLoading } = useQuery({
    queryKey: ["exams", { id }],
    queryFn: () => examStore.getById(id),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const users_list =
    data.InvitedExam?.map((x: any) => {
      const y = x.user;
      return { ...y };
    }) || [];

  const breadcrumbs = [{ name: data.name, path: "/admin/exams/edit/" + id }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Оқушы қосу</TypographyH1>
      <WhiteBox>
        <div className="flex-col flex gap-6">
          <AdminUsersDataTable columns={columns()} data={users_list} />
          <AdminExamsInviteStudentsForm id={data.id} />
        </div>
      </WhiteBox>
    </>
  );
}
