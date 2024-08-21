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
  nextLecture,
} from "@/lib/utils";
import { useCourseStore } from "@/store/course";
import { useExamStore } from "@/store/exam";
import { useLectureStore } from "@/store/lecture";
import { useQuery } from "@tanstack/react-query";
import { BookCheck, ChevronRight, ListCollapse } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { LectureQuizResultsTable } from "./quiz/result-table";
import { columns } from "./quiz/columns";
import { Question } from "@/types";
import { MyContainer } from "@/components/container";
import { useSectionStore } from "@/store/section";
import { HomeHeader } from "@/components/header";

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
  const sectionsStore = useSectionStore();

  const [videoLoading, setVideoLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [lectureId, setLectureId] = useState<number | null>(lecture_id);

  const [nextLectureId, setNextLectureId] = useState<number | null>(null);

  const { data: course, isLoading: courseIsLoading } = useQuery({
    queryKey: ["course", { id: course_id }],
    queryFn: () => courseStore.findCourseById(course_id),
  });

  const { data: sections, isLoading: sectionsIsLoading } = useQuery({
    queryKey: ["sections", { id: course_id }],
    queryFn: () => sectionsStore.getAll(course_id),
  });

  const { data: lecture, isLoading: lectureIsLoading } = useQuery({
    queryKey: ["lecture", { id: lecture_id }],
    queryFn: () => {
      if (lecture_id) return lectureStore.getById(lecture_id);
      else {
        const firstLectureId = getFirstLectureId(sections!);
        setLectureId(firstLectureId);
        if (firstLectureId) return lectureStore.getById(firstLectureId);
      }
    },
    enabled: !!sections,
  });

  const { data: examResults, isLoading: examResultsLoading } = useQuery({
    queryKey: ["exam-results", { id: lecture?.exam?.id }],
    queryFn: () => {
      if (lecture?.exam?.id) {
        return examStore.getUserResults(lecture.exam.id);
      }
    },
    enabled: !!lecture,
  });

  useEffect(() => {
    if (sections && lectureId) {
      const nextLectureId = nextLecture(lectureId, sections);
      console.log("nextLectureId: ", nextLectureId);
      setNextLectureId(nextLectureId);
    }
  }, [sections, lectureId]);

  const videoUrl = lecture?.videoUrl
    ? convertToPreviewLink(lecture.videoUrl)
    : null;

  let points = 0;
  if (lecture && lecture.exam) {
    let sum = 0;
    const questions: Question[] = JSON.parse(lecture.exam.questions);

    for (let x of questions) {
      sum += x.points;
    }

    points = sum;
  }

  const currentSection = sections?.find((s) =>
    s.lectures.some((l) => l.id === lectureId),
  );
  const currentLectureIndex = currentSection?.lectures.findIndex(
    (l) => l.id === lectureId,
  );
  const totalLectures = currentSection?.lectures.length ?? 0;
  const currentLectureNumber = (currentLectureIndex ?? -1) + 1;

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
            <div className="border shadow-sm rounded-lg bg-white">
              <button
                onClick={() => setIsSheetOpen(true)}
                className="flex hover:underline font-semibold items-center md:hidden max-md:px-4 max-md:py-5 "
              >
                <ListCollapse className="mr-2" />
                Мазмұн
              </button>
              <div className="border-b p-4 md:p-5 flex justify-between items-center gap-4">
                <div className="w-full">
                  <p className="text-primary text-sm mb-1 font-medium">
                    {currentLectureNumber > 0 && totalLectures > 0
                      ? `${currentLectureNumber}/${totalLectures} Сабақ - ${lecture?.name ?? ""}`
                      : "Сабақ туралы ақпарат қолжетімді емес"}
                  </p>
                  <h1 className="text-slate-900 font-semibold">
                    {
                      sections?.find((s) =>
                        s.lectures.some((l) => l.id === lectureId),
                      )?.name
                    }
                  </h1>
                </div>
                {nextLectureId && (
                  <Button asChild variant={"outline"}>
                    <Link
                      href={`/course/${course_id}/learning/lecture/${nextLectureId}`}
                    >
                      Келесі сабақ
                    </Link>
                  </Button>
                )}
              </div>
              <div className="flex flex-col p-4 md:p-10 gap-4 md:gap-10">
                <div className="relative">
                  {videoUrl && videoLoading && (
                    <div className="rounded-lg absolute w-full h-full z-[10] bg-opacity-90 bg-black">
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
                    <div className="rounded-lg relative aspect-video w-full overflow-hidden pt-[calc(56.25%)]">
                      <iframe
                        src={videoUrl}
                        className={cn(
                          "w-full h-full absolute top-0 left-0 right-0 bottom-0",
                        )}
                        allowFullScreen
                        onLoad={() => setVideoLoading(false)}
                        // allow="autoplay"
                      />
                    </div>
                  )}
                </div>
                <article>{lecture.content}</article>
              </div>
              {/* <LectureQuizResultsTable
                columns={[
                  { ...columns[0] },
                  {
                    ...columns[1],
                    header: `Балл / ${points.toFixed(2)}`,
                  },
                  {
                    ...columns[2],
                    header: `Баға / ${Number(100).toFixed(2)}%`,
                  },
                ]}
                data={[
                  {
                    grade: calcPercentage(examResults.result, points),
                    points: examResults.result,
                    state: "Аяқталды",
                    createdAt: "",
                    editedAt: "",
                  },
                ]}
              /> */}
              <div className="border-t py-4 md:py-6 md:px-10 flex justify-end items-center gap-4">
                {!!(
                  lecture.exam &&
                  examResults.result === null &&
                  JSON.parse(lecture.exam.questions).length
                ) && (
                  <Button asChild>
                    <Link
                      href={`/course/${course_id}/learning/lecture/${lecture_id || getFirstLectureId(sections!)}/quiz`}
                    >
                      <BookCheck className="mr-2" strokeWidth={1.8} size={20} />
                      Quiz бастау
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </MyContainer>
        )}
      </div>
    </>
  );
}
