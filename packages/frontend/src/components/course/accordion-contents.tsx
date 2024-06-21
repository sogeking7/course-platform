"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useCourseStore } from "@/store/course";
import { useSectionStore } from "@/store/section";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, ListCollapse, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AccordionContents = ({
  lectureId,
  courseId,
}: {
  lectureId?: number | null;
  courseId: number;
}) => {
  const router = useRouter();

  // const courseStore = useCourseStore();
  const sectionStore = useSectionStore();

  const { data: sections, isLoading: sectionsIsLoading } = useQuery({
    queryKey: ["sections", { id: courseId }],
    queryFn: () => sectionStore.getAll(courseId),
  });

  const defaultValue = sections
    ? [...sections.map((x) => `section-${x.id}`)]
    : [];

  return (
    <div className="max-md:hidden fixed max-w-[345px] min-w-[345px] pb-10 h-[calc(100vh-56px)] bg-[#23292F] text-slate-50 overflow-y-auto ">
      <button className="p-5 text-left bg-[#23292F] z-10 flex font-bold items-center fixed w-[345px] border-b border-b-zinc-600 text-base">
        <ListCollapse className="mr-2" />
        Мазмұн
      </button>
      <div className="pt-[60px] min-h-[calc(100% - 60px)] z-[5]">
        {sectionsIsLoading || !sections ? (
          <div className="p-5">Жүктелуде...</div>
        ) : (
          <Accordion
            defaultValue={defaultValue}
            type="multiple"
            className="w-full relative "
          >
            {sections.map((section, index) => (
              <AccordionItem
                className=""
                key={section.id}
                value={`section-${section.id}`}
              >
                <AccordionTrigger className="pl-[20px] py-5 border-b border-zinc-600 text-left text-sm font-semibold">
                  <a className="flex items-center">
                    {/* {!!section.isLocked && <Lock size={12} className="mr-3" />} */}
                    {`${index + 1}. ${section.name}`}
                    {/* {!section.isLocked && (
                      <span>
                        
                        <b
                          className={cn(
                            !!(section.averageScore! >= 70) && "text-green-500",
                            !!(
                              section.averageScore! >= 50 &&
                              section.averageScore! < 70
                            ) && "text-yellow-500",
                            !!(section.averageScore! < 50) && "text-red-500",
                          )}
                        >
                          {" - " + section.averageScore?.toFixed(2) + "%"}
                        </b>
                      </span>
                    )} */}
                  </a>
                </AccordionTrigger>
                {/* {!!!section.isLocked && ( */}
                <AccordionContent
                  className={cn(
                    "px-0 text-sm ",
                    index === sections.length - 1
                      ? ""
                      : "border-b  border-b-zinc-600",
                  )}
                >
                  <ul>
                    {section.lectures.map((lecture, jndex) => (
                      <button
                        key={lecture.id}
                        onClick={() => {
                          // if (!section.isLocked) {
                          //   router.push(
                          //     `/course/${courseId}/learning/lecture/${lecture.id}`,
                          //   );
                          // }
                          router.push(
                            `/course/${courseId}/learning/lecture/${lecture.id}`,
                          );
                        }}
                        className={cn(
                          "w-full",
                          // section.isLocked
                          //   ? "cursor-not-allowed"
                          //   : "cursor-pointer",
                          "cursor-pointer",
                          lectureId === lecture.id ? "bg-red-500" : "",
                        )}
                      >
                        <li
                          className={cn(
                            "border-l-4 text-sm",
                            "pt-3 pb-5 pl-4 pr-5 hover:underline flex",
                            lectureId === lecture.id
                              ? "bg-[#030405] border-l-white"
                              : "border-l-transparent",
                            "flex items-center",
                          )}
                        >
                          {!!(!lecture.isExamPassed && lecture.exam?.id) && (
                            <div className="w-[11px] h-[11px] rounded-full border mr-3 relative top-[0px]"></div>
                          )}
                          {!!(lecture.isExamPassed && lecture.exam?.id) && (
                            <CircleCheckBig
                              strokeWidth={2.5}
                              className="mr-2 text-green-400"
                              size={14}
                            />
                          )}
                          {/* {!!section.isLocked && (
                            <Lock size={12} className="mr-2" />
                          )} */}
                          {lecture.name}
                        </li>
                      </button>
                    ))}
                  </ul>
                </AccordionContent>
                {/* )} */}
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};
