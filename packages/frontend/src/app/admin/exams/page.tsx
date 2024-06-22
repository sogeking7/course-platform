"use client";

import { AdminExamsDataTable } from "./data-table";
import { columns } from "./columns";
import { TypographyH1 } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LayoutLoader } from "@/components/loader";
import { Plus } from "lucide-react";
import { useExamStore } from "@/store/exam";

export default function AdminExamsPage() {
  const examStore = useExamStore();

  const { data, isLoading } = useQuery({
  queryKey: ["exams"],
    queryFn: () => examStore.getAll(),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  return (
    <>
      <div className="flex justify-between">
        <TypographyH1>Емтихандар</TypographyH1>
        <Link href="/admin/exams/create">
          <Button>
            <Plus className="mr-2" size={20} /> Қосу
          </Button>
        </Link>
      </div>
      <AdminExamsDataTable columns={columns} data={data} />
    </>
  );
}
