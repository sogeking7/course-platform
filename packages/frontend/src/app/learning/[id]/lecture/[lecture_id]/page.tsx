"use client";

import { MyContainer } from "@/components/container";
import { AccordionContents } from "@/components/course/accordion-contents";
import { LayoutLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { useCourseStore } from "@/store/course";
import { useLectureStore } from "@/store/lecture";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, ListCollapse } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function LecturePage({
  params,
}: {
  params: { lecture_id: string; id: string };
}) {
  const course_id = Number(params.id);
  const lecture_id = Number(params.lecture_id);

  const lectureStore = useLectureStore();
  const courseStore = useCourseStore();

  const { data: lecture, isLoading: lectureIsLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => lectureStore.getById(lecture_id),
  });

  const { data: course, isLoading: courseIsLoading } = useQuery({
    queryKey: ["course", { id: course_id }],
    queryFn: () => courseStore.findCourseById(course_id),
  });

  if (lectureIsLoading || courseIsLoading || !lecture || !course) {
    return <LayoutLoader />;
  }

  return (
    <div className="flex h-full">
      <div className="max-w-[350px] min-w-[350px] pb-10 h-[calc(100vh-55px)] bg-neutral-800 text-slate-50 overflow-scroll ">
        <button className="p-5 text-left bg-neutral-800 z-10 flex font-bold items-center fixed w-[350px] border-b border-b-zinc-700">
          <ListCollapse className="mr-4" />
          Contents
        </button>
        <div className="pt-[69px] min-h-[calc(100% - 69px)] z-[5]">
          <AccordionContents
            defaultValue={[`section-${lecture.sectionId}`]}
            courseId={course.id}
            sections={course.sections}
          />
        </div>
      </div>
      <div className="w-full">
        <MyContainer>
          <TypographyH1>{lecture.name}</TypographyH1>
          <article className="prose !max-w-full mt-4 w-full">
            <ReactMarkdown className="w-full" rehypePlugins={[rehypeRaw]}>
              {lecture.content}
            </ReactMarkdown>
          </article>
          <div className="mt-16 flex justify-between">
            <Button variant={"ghost"} className="flex items-center">
              <ChevronLeft className="inline-block mr-2" size={20} />
              Алдыңғы тақырып
            </Button>
            <Button variant={"ghost"} className="flex items-center">
              Келесі тақырып
              <ChevronRight className="ml-2 inline-block" size={20} />
            </Button>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
