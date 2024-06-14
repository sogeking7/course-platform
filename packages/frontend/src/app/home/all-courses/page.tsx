"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course/course-card";
import { Course } from "../../../types";
import { TypographyH1 } from "@/components/ui/typography";
import { LayoutLoader } from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import { useCourseStore } from "@/store/course";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function AllCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const courseStore = useCourseStore();
  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => courseStore.getAll(),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = data.filter((course: Course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <TypographyH1>Курстар</TypographyH1>
      <div className="mb-3 md:bg-white rounded-2xl md:shadow-sm md:border md:p-5 flex gap-3 md:gap-4">
        <Input
          placeholder="Курс іздеу"
          className="w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button className="max-md:hidden">
          <Search size={20} className="mr-2 " />
          Іздеу
        </Button>
        <Button size={"icon"} className="md:hidden">
          <Search size={20} />
        </Button>
      </div>
      {/*  */}
      <p className="text-neutral-500 mb-4 pl-2 flex items-center text-sm">
        <Search size={16} className="mr-2 " />
        {filteredCourses.length} нәтижелер табылды
      </p>

      <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8">
        {filteredCourses.map((course: Course) => (
          <CourseCard key={course.id} item={course as Course} />
        ))}
      </div>
    </>
  );
}
