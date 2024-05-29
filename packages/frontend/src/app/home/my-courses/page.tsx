"use client";

import { CourseCard } from "@/components/course/course-card";
import { LayoutLoader } from "@/components/loader";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { Course } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function MyCoursesPage() {
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
      <TypographyH1>Менің курстарым</TypographyH1>
      <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {data.map((course: Course) => (
          <CourseCard
            link={`/course/${course.id}/learning/lecture/${course.sections[0].lectures[0].id}`}
            key={course.id}
            item={course as Course}
          />
        ))}
      </div>
    </div>
  );
}
