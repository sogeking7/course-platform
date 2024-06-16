"use client";

import { AccordionContents } from "@/components/course/accordion-contents";
import { AccordionSheet } from "@/components/course/accordion-sheet";
import { LayoutLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  calcPercentage,
  cn,
  convertToPreviewLink,
  getFirstLectureId,
} from "@/lib/utils";
import { useCourseStore } from "@/store/course";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { useQuery } from "@tanstack/react-query";
import {
  BookCheck,
  ChevronLeft,
  ChevronRight,
  ListCollapse,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { LectureQuizResultsTable } from "./quiz/result-table";
import { columns } from "./quiz/columns";
import { QuizResult } from "@/types";
import { MyContainer } from "@/components/container";

export default function LectureIdPage({
  params,
}: {
  params: { lecture_id: string; id: string };
}) {
  const course_id = Number(params.id);
  const lecture_id =
    params.lecture_id === "default" ? null : Number(params.lecture_id);

  const lectureStore = useLectureStore();
  const courseStore = useCourseStore();
  const examStore = useExamStore();

  const [videoLoading, setVideoLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: course, isLoading: courseIsLoading } = useQuery({
    queryKey: ["accordion", { id: course_id }],
    queryFn: () => courseStore.findCourseById(course_id),
  });

  const { data: lecture, isLoading: lectureIsLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => {
      if (lecture_id) return lectureStore.getById(lecture_id);
      else {
        const firstLectureId = getFirstLectureId(course!);
        if (firstLectureId) return lectureStore.getById(firstLectureId);
      }
    },
    enabled: !!course,
  });

  const examId = lecture?.exam?.id;

  const { data: examResults, isLoading: examResultsLoading } = useQuery({
    queryKey: ["exam-results", { id: examId }],
    queryFn: () => examStore.getUserResults(examId!),
    enabled: !!examId,
  });

  const nextLecture = (): number | null | undefined => {
    if (!course || courseIsLoading) return;

    let nextLectureId: number | null | undefined = null;

    const sections = course?.sections;

    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i].lectures.length; j++) {
        const thisLectureId = sections[i].lectures[j].id;
        if (lecture_id === thisLectureId) {
          if (j < sections[i].lectures.length - 1) {
            nextLectureId = sections[i].lectures[j + 1].id;
          } else if (i < sections.length - 1) {
            const nextSectionLectures = sections[i + 1]?.lectures;
            if (nextSectionLectures && nextSectionLectures.length > 0) {
              nextLectureId = nextSectionLectures[0]?.id || null;
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
    }

    return nextLectureId;
  };

  const prevLecture = (): number | null | undefined => {
    if (!course || courseIsLoading) return;

    let prevLectureId = null;

    const sections = course?.sections;

    for (let i = 0; i < sections.length; i++) {
      for (let j = 0; j < sections[i].lectures.length; j++) {
        const thisLectureId = sections[i].lectures[j].id;
        if (lecture_id === thisLectureId) {
          if (j > 0) {
            prevLectureId = sections[i].lectures[j - 1].id;
          } else if (i > 0) {
            const previousSectionLectures = sections[i - 1]?.lectures;
            if (previousSectionLectures && previousSectionLectures.length > 0) {
              prevLectureId =
                previousSectionLectures[previousSectionLectures.length - 1].id;
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
    }

    return prevLectureId;
  };

  const prevLectureId = prevLecture();
  const nextLectureId = nextLecture();

  const videoUrl = lecture?.videoUrl
    ? convertToPreviewLink(lecture.videoUrl)
    : null;

  // const x = calcPercentage(
  //   examResults,
  //   JSON.parse(lecture?.exam?.questions as string).length,
  // );

  // const r: QuizResult = {
  //   grade: x,
  //   points: examResults,
  //   state: "Аяқталды",
  // };

  // const modColumns = [...columns];
  // modColumns[1].header = `Балл / ${JSON.parse(lecture?.exam?.questions as string).length.toFixed(2)}`;
  // modColumns[2].header = `Баға / ${Number(100).toFixed(2)}%`;

  return (
    <>
      <AccordionContents lectureId={lecture?.id} courseId={course_id} />
      <AccordionSheet
        lectureId={lecture?.id}
        courseId={course_id}
        isOpen={isSheetOpen}
        setIsOpen={setIsSheetOpen}
      />
      <div className="md:pl-[calc(345px)] h-full w-full">
        {lectureIsLoading || !lecture || examResultsLoading ? (
          <LayoutLoader />
        ) : (
          <MyContainer>
            <div className=" border rounded-xl bg-white">
              <button
                onClick={() => setIsSheetOpen(true)}
                className="flex hover:underline font-semibold items-center md:hidden max-md:px-4 max-md:pt-5 "
              >
                <ListCollapse className="mr-2" />
                Мазмұн
              </button>
              <div className="border-b pb-4 px-4 pt-7 md:pb-5 md:px-5 md:pt-5">
                <h1 className="text-slate-900 tracking-[0.015em] scroll-m-20 text-base  lg:text-lg font-semibold">
                  {course?.name}
                </h1>
                <h2>{lecture.name}</h2>
              </div>
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
              <div className="p-4 md:p-5">
                <article className=" prose !max-w-full mt-4 w-full relative">
                  <ReactMarkdown className="w-full" rehypePlugins={[rehypeRaw]}>
                    {lecture.content}
                  </ReactMarkdown>
                </article>
                {lecture.exam && (
                  <div className="mt-16 w-full">
                    {/* {JSON.stringify(examResults)} */}
                    {examResults && !examResultsLoading && (
                      <LectureQuizResultsTable
                        columns={[
                          { ...columns[0] },
                          {
                            ...columns[1],
                            header: `Балл / ${JSON.parse(lecture?.exam?.questions as string).length.toFixed(2)}`,
                          },
                          {
                            ...columns[2],
                            header: `Баға / ${Number(100).toFixed(2)}%`,
                          },
                        ]}
                        data={[
                          {
                            grade: calcPercentage(
                              examResults || 1,
                              JSON.parse(lecture?.exam?.questions as string)
                                .length,
                            ),
                            points: examResults || 1,
                            state: "Аяқталды",
                          },
                        ]}
                      />
                    )}
                    {!examResults && !examResultsLoading && (
                      <div className="flex justify-end">
                        <Link
                          href={`/course/${course_id}/learning/lecture/${lecture_id || getFirstLectureId(course!)}/quiz`}
                        >
                          <Button>
                            <BookCheck className="mr-2" size={20} />
                            Тестілеу бастау
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={cn(
                    prevLectureId && nextLectureId
                      ? "justify-between"
                      : prevLectureId
                        ? "justify-start"
                        : "justify-end",

                    "mt-16 flex  w-full ",
                  )}
                >
                  {prevLectureId && (
                    <Link
                      href={`/course/${course_id}/learning/lecture/${prevLectureId}`}
                      className="flex items-center flex-start hover:underline"
                    >
                      <ChevronLeft className="inline-block mr-2" size={20} />
                      Алдыңғы сабақ
                    </Link>
                  )}

                  {nextLectureId && (
                    <Link
                      href={`/course/${course_id}/learning/lecture/${nextLectureId}`}
                      className="flex items-center flex-end hover:underline"
                    >
                      Келесі сабақ
                      <ChevronRight className="ml-2 inline-block" size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </MyContainer>
        )}
      </div>
    </>
  );
}
