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

export default function LectureIdPage({
  params,
}: {
  params: { lecture_id: string; id: string };
}) {
  const course_id = Number(params.id);
  const lecture_id = Number(params.lecture_id);

  const lectureStore = useLectureStore();

  const { data: lecture, isLoading: lectureIsLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => lectureStore.getById(lecture_id),
  });

  // if () {
  //   return ;
  // }

  return (
    <>
      <AccordionContents lectureId={lecture?.id} courseId={course_id} />
      {lectureIsLoading || !lecture ? (
        <LayoutLoader />
      ) : (
        <MyContainer>
          <div className="p-5 border rounded-sm bg-white">
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
          </div>
        </MyContainer>
      )}
    </>
  );
}
