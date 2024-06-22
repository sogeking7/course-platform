"use client";

import { CourseCard } from "@/components/course/course-card";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { Course } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function MyExamsPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const courseStore = useCourseStore();

  const { data, isLoading } = useQuery({
    queryKey: ["users-courses"],
    queryFn: () => courseStore.getAllCoursesByUserId(user?.id!),
    enabled: !!user?.id,
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  return (
    <div>
      <TypographyH1>Емтихандар</TypographyH1>
      <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 sm:gap-6">
        {data.map((course: Course) => (
          <CourseCard
            link={`/course/${course.id}/learning/lecture/default`}
            key={course.id}
            item={course as Course}
          />
        ))}
      </div>
    </div>
  );
}
