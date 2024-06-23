"use client";

import { LayoutLoader } from "@/components/loader";
import { AdminExamsInviteStudentsForm } from "./form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TypographyH1 } from "@/components/ui/typography";
import { columns } from "./columns";
import { Bread } from "@/components/bread";
import { WhiteBox } from "@/components/container";
import { useExamStore } from "@/store/exam";
import { AdminExamsUserInviteDataTable } from "./data-table";
import { useUserStore } from "@/store/user";
import { RowSelectionState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function AdminExamsInviteStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = useQueryClient();
  const id = parseInt(params.id);

  const examStore = useExamStore();
  const userStore = useUserStore();

  const [rowSelectionOne, setRowSelectionOne] = useState<RowSelectionState>({});

  const { data, isLoading } = useQuery({
    queryKey: ["exam", { id }],
    queryFn: () => examStore.getById(id),
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => userStore.getAll(),
  });

  const mutationInvite = useMutation({
    mutationFn: (newData: { emails: { email: string }[] }) =>
      examStore.inviteUser(id, { ...newData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", { id }] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (newData: { emails: { email: string }[] }) =>
      examStore.deleteUser(id, { ...newData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam", { id }] });
    },
  });

  useEffect(() => {
    if (users && data) {
      const initialSelection: RowSelectionState = {};
      users.forEach(
        (user, index) =>
          (initialSelection[index] = !!data.invitedExam?.some(
            (invite) => invite.user?.id === user.id,
          )),
      );
      console.log("initialSelection", initialSelection);
      setRowSelectionOne((p) => ({ ...p, ...initialSelection }));
    }
  }, [data, users, isUsersLoading, isLoading]);

  if (isLoading || !data || isUsersLoading || !users) {
    return <LayoutLoader />;
  }

  // const users_list =
  //   data.invitedExam?.map((x: any) => {
  //     const y = x.user;
  //     return { ...y };
  //   }) || [];

  // console.log("obj", obj);
  const breadcrumbs = [
    {
      name: "Емтихандар",
      path: `/admin/exams`,
    },
    { name: data.name, path: "/admin/exams/edit/" + id },
  ];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Оқушы қосу</TypographyH1>
      <WhiteBox>
        <div className="flex-col flex gap-6">
          <AdminExamsUserInviteDataTable
            deleteUserFromExam={mutationDelete}
            inviteUserToExam={mutationInvite}
            initialRow={rowSelectionOne}
            columns={columns()}
            data={users}
          />
          <AdminExamsInviteStudentsForm id={data.id} />
        </div>
      </WhiteBox>
    </>
  );
}
