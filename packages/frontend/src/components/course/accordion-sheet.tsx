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
import Link from "next/link";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetOverlay,
} from "@/components/ui/sheet";
import { ListCollapse, X } from "lucide-react";

export const AccordionSheet = ({
  isOpen,
  setIsOpen,
  lectureId,
  courseId,
}: any) => {
  const courseStore = useCourseStore();
  const { data: course, isLoading: courseIsLoading } = useQuery({
    queryKey: ["accordion", { id: courseId }],
    queryFn: () => courseStore.findCourseById(courseId),
  });

  const defaultValue = course
    ? [...course.sections.map((x) => `section-${x.id}`)]
    : [];

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(v) => {
        setIsOpen(v);
      }}
    >
      <SheetContent
        className="!pr-0 !m-0 border-none overflow-auto !w-[320px] h-full bg-[#23292F] text-slate-50"
        side={"left"}
      >
        <div className="w-full pr-0 pb-10 relative bg-[#23292F] text-slate-50 overflow-y-auto ">
          <div className="p-5 text-left w-[320px] bg-[#23292F] z-10 flex font-bold items-center justify-between fixed  border-b border-b-zinc-600 text-base">
            <div className="flex items-center font-semibold">
              <ListCollapse className="mr-2" />
              Мазмұн
            </div>
            <button
              className="h-[24px] w-[24px] border-slate-50 rounded-full border flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="pt-[60px] min-h-[calc(100% - 60px)] z-[5]">
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
                    <AccordionTrigger className="pl-[25px] py-5 border-b border-zinc-600 text-left text-sm font-semibold">
                      {index + 1}. {section.name}
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        "px-0 text-sm ",
                        index === course.sections.length - 1
                          ? ""
                          : "border-b  border-b-zinc-600",
                      )}
                    >
                      <ul>
                        {section.lectures.map((lecture, jndex) => (
                          <Link
                            key={lecture.id}
                            href={`/course/${courseId}/learning/lecture/${lecture.id}`}
                            className={cn(
                              "cursor-pointer",
                              lectureId === lecture.id ? "bg-red-500" : "",
                            )}
                          >
                            <li
                              className={cn(
                                "border-l-4 text-sm",
                                "pt-2 pb-5 pl-4 pr-5 hover:underline flex cursor-pointer",
                                lectureId === lecture.id
                                  ? "bg-[#030405] border-l-white"
                                  : "border-l-transparent",
                              )}
                            >
                              <div className="w-[11px] h-[11px] rounded-full border mr-3 relative top-[3px]"></div>
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
        {/* <SheetHeader className="py-3 px-20 !h-[50px] flex items-center border-b border-neutral-300 shadow-sm">
          Contents
        </SheetHeader>
        <div>{children}</div> */}
      </SheetContent>
    </Sheet>
  );
};
