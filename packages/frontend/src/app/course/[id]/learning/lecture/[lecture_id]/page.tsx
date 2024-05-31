"use client";

import { MyContainer } from "@/components/container";
import { AccordionContents } from "@/components/course/accordion-contents";
import { LayoutLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { cn, convertToPreviewLink } from "@/lib/utils";
import { useLectureStore } from "@/store/lecture";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const [videoLoading, setVideoLoading] = useState(true);
  const { data: lecture, isLoading: lectureIsLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => lectureStore.getById(lecture_id),
  });

  const videoUrl = lecture?.videoUrl
    ? convertToPreviewLink(lecture.videoUrl)
    : null;

  // const renderVideo = useMemo(
  //   () => (
  //     <iframe
  //       src={videoUrl}
  //       className={cn("w-full h-full absolute top-0 left-0 right-0 bottom-0")}
  //       onLoad={() => setVideoLoading(false)}
  //       // allow="autoplay"
  //     />
  //   ),
  //   [videoUrl],
  // );

  return (
    <>
      <AccordionContents lectureId={lecture?.id} courseId={course_id} />
      <div className="pl-[calc(350px)] h-full w-full">
        {lectureIsLoading || !lecture ? (
          <LayoutLoader />
        ) : (
          <MyContainer>
            <div className="p-5 border rounded-sm bg-white">
              <TypographyH1>{lecture.name}</TypographyH1>
              <div className="relative">
                {videoUrl && videoLoading && (
                  <div className="absolute w-full h-full z-[10] bg-opacity-90 bg-black">
                    <p className="top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute z-[11]">
                      <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 lg:w-16 lg:h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#1f2d5a]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </p>
                  </div>
                )}
                {videoUrl && (
                  <div className="relative aspect-video w-full overflow-hidden pt-[calc(56.25%)]">
                    <iframe
                      src={videoUrl}
                      className={cn(
                        "w-full h-full absolute top-0 left-0 right-0 bottom-0",
                      )}
                      onLoad={() => setVideoLoading(false)}
                      // allow="autoplay"
                    />
                  </div>
                )}
              </div>
              <article className="prose !max-w-full mt-4 w-full relative">
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
      </div>
    </>
  );
}
