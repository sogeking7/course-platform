"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import { ListCollapse } from "lucide-react";
import Link from "next/link";

export const AccordionContents = ({
  lectureId,
  courseId,
}: {
  lectureId?: number;
  courseId: number;
}) => {
  const courseStore = useCourseStore();
  const { data: course, isLoading: courseIsLoading } = useQuery({
    queryKey: ["accordion", { id: courseId }],
    queryFn: () => courseStore.findCourseById(courseId),
  });

  const defaultValue = course
    ? [...course.sections.map((x) => `section-${x.id}`)]
    : [];

  return (
    <div className="fixed max-w-[350px] min-w-[350px] pb-10 h-[calc(100vh-55px)] bg-[#23292F] text-slate-50 overflow-scroll ">
      <button className="p-5 text-left bg-[#23292F] z-10 flex font-bold items-center fixed w-[350px] border-b border-b-zinc-700">
        <ListCollapse className="mr-4" />
        Контент
      </button>
      <div className="pt-[69px] min-h-[calc(100% - 69px)] z-[5]">
        {courseIsLoading || !course ? (
          <div className="p-5">Жүктелуде...</div>
        ) : (
          <Accordion
            defaultValue={defaultValue}
            type="multiple"
            className="w-full relative "
          >
            {course.sections.map((section, index) => (
              <AccordionItem
                className=""
                key={section.id}
                value={`section-${section.id}`}
              >
                <AccordionTrigger className="p-5 border-b border-zinc-700 text-left text-sm font-bold">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    "px-0 text-sm font-normal",
                    index === course.sections.length - 1
                      ? ""
                      : "border-b  border-b-zinc-700",
                  )}
                >
                  <ul>
                    {section.lectures.map((lecture, jndex) => (
                      <Link
                        key={lecture.id}
                        href={`/course/${courseId}/learning/lecture/${lecture.id}`}
                        className={cn(
                          "cursor-pointer",
                          lectureId === lecture.id
                            ? "bg-red-500 font-bold"
                            : "",
                        )}
                      >
                        <li
                          className={cn(
                            "border-l-4 ",
                            "pt-2 pb-5 pl-4 pr-5 hover:underline flex cursor-pointer",
                            lectureId === lecture.id
                              ? "bg-[#030405] font-bold border-l-white"
                              : "border-l-transparent",
                          )}
                        >
                          <div className="min-w-3 h-3 rounded-full border mr-3 relative top-[5px]"></div>
                          {lecture.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
