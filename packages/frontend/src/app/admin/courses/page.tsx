"use client";

import { AdminCoursesDataTable } from "./data-table";
import { columns } from "./columns";
import { TypographyH1 } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useCourseStore } from "@/store/course";
import { LayoutLoader } from "@/components/loader";
import { Plus } from "lucide-react";

export default function AdminUsersPage() {
  const courseStore = useCourseStore();

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => courseStore.getAll(),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  return (
    <>
      <div className="flex justify-between">
        <TypographyH1>Курстар</TypographyH1>
        <Link href="/admin/courses/create">
          <Button>
            <Plus className="mr-2" size={20} />
            Қосу
          </Button>
        </Link>
      </div>
      <AdminCoursesDataTable columns={columns} data={data} />
    </>
  );
}
