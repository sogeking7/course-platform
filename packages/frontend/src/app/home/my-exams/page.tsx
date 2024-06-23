"use client";

import { CourseCard } from "@/components/course/course-card";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { useExamStore } from "@/store/exam";
import { Course } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { columns } from "./columns";
import { AdminExamsDataTable } from "./data-table";

export default function MyExamsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const examStore = useExamStore();

  const { data, isLoading } = useQuery({
    queryKey: ["exams-invited"],
    queryFn: () => examStore.getInvitedExams(),
    enabled: !!user?.id,
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  return (
    <div>
      <TypographyH1>Емтихандар</TypographyH1>
      <AdminExamsDataTable columns={columns} data={data} />
    </div>
  );
}
