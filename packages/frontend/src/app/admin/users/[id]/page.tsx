"use client";

import { TypographyH1 } from "@/components/ui/typography";
import { AdminUsersCreateForm } from "../create/form";
import { useQuery } from "@tanstack/react-query";
import { LayoutLoader } from "@/components/loader";
import { Bread } from "@/components/bread";
import { useUserStore } from "@/store/user";

export default function AdminUserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const courseStore = useUserStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["user", { id: Number(id) }],
    queryFn: () => courseStore.findUserById(id),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [{ name: "Оқушылар", path: "/admin/users" }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>{data.lastName + " " + data.firstName} </TypographyH1>
      <AdminUsersCreateForm mode={"edit"} data={data} />
    </>
  );
}
