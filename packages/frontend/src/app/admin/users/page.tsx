"use client";

import { AdminUsersDataTable } from "./data-table";
import { columns } from "./columns";
import { TypographyH1 } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/user";
import { LayoutLoader } from "@/components/loader";
import { Plus } from "lucide-react";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const userStore = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => userStore.getAll(),
  });

  const mutation = useMutation({
    mutationFn: (id: number) => userStore.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  return (
    <>
      <div className="flex justify-between">
        <TypographyH1>Қолданушылар</TypographyH1>
        <Link href="/admin/users/create">
          <Button>
            <Plus className="mr-2" size={20} /> Қосу
          </Button>
        </Link>
      </div>
      <AdminUsersDataTable columns={columns(mutation)} data={data} />
    </>
  );
}
