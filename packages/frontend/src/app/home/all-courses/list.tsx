"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { CourseCard } from "@/components/course/course-card";
import { Course } from "../../../types";

export const AllCoursesList = ({ data }: { data: Course[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = data.filter((course: Course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="mb-3 md:bg-white rounded-lg md:shadow-sm md:border border-zinc-300 md:p-5 flex gap-3 md:gap-4">
        <Input
          placeholder="Курс іздеу"
          className="w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <Button className="max-md:hidden">
          <Search size={20} className="mr-2 " />
          Іздеу
        </Button>
        <Button size={"icon"} className="md:hidden">
          <Search size={20} />
        </Button> */}
      </div>
      <div className="text-neutral-500 mb-4 pl-2 flex items-center text-sm">
        <Search size={16} className="mr-2 " />
        {filteredCourses.length} нәтижелер табылды
      </div>

      <div className="grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
        {filteredCourses.map((course: Course) => (
          <CourseCard key={course.id} item={course as Course} />
        ))}
      </div>
    </>
  );
};
