"use client";

import { LayoutLoader } from "@/components/loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Book, BookOpen, File, MonitorPlay } from "lucide-react";
import HomeLayout from "@/app/home/layout";
import { Bread } from "@/components/bread";
import { TypographyH2 } from "@/components/ui/typography";
import { WhiteBox } from "@/components/container";
import { cn } from "@/lib/utils";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CoursePage({ params }: Props) {
  const id = Number(params.id);

  const courseStore = useCourseStore();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["course", { id: Number(id) }],
    queryFn: () => courseStore.findCourseById(id),
  });

  if (!data || isLoading) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [{ name: " Курстар", path: "/home/all-courses" }];

  return (
    <HomeLayout>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="flex gap-4 md:gap-2 lg:gap-6 md:flex-row flex-col-reverse">
        <div className="flex flex-col gap-4 md:gap-2 lg:gap-6 md:w-3/5 lg:w-2/3">
          <WhiteBox>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="mt-4">{data.description}</p>
          </WhiteBox>
          <WhiteBox>
            <TypographyH2>Курс бағдарламасы</TypographyH2>
            <ul className="mb-4 text-gray-500 font-semibold flex gap-3">
              <li className="flex items-center">
                <BookOpen
                  strokeWidth={2.4}
                  className="mr-2 inline-flex h-4 w-4 "
                />
                <span className="text-sm">{data.sections.length} бөлім</span>
              </li>
              <span className="text-gray-300">|</span>
              <li className="flex items-center">
                <Book strokeWidth={2.4} className="mr-2 inline-flex h-4 w-4 " />
                <span className="text-sm">
                  {data.sections.reduce((x, v) => v.lectures.length + x, 0)}{" "}
                  сабақ
                </span>
              </li>
            </ul>
            <Accordion
              type="multiple"
              className="gap-0 border-t-none rounded-lg border-x border-b  flex-col flex"
              /* @ts-ignore */
              collapsible={true}
            >
              {data.sections.map((section, index) => (
                <AccordionItem key={section.id} value={`item-${section.id}`}>
                  <AccordionTrigger
                    className={cn(
                      "w-full bg-white px-5 py-4 border-t ",
                      index === 0 ? "rounded-t-lg" : "",
                      index === data.sections.length - 1 ? "rounded-b-lg" : "",
                    )}
                  >
                    <label className=" flex gap-2 items-center min-w-max">
                      {/* <File size={14} /> */}
                      {/* <span>sections {index + 1}:</span> */}
                      <span className="  font-semibold">
                        {index + 1}. {section.name}
                      </span>
                    </label>
                  </AccordionTrigger>
                  <AccordionContent className="py-6 px-8 border-t rounded-b-lg bg-white">
                    <ul className="flex flex-col gap-5">
                      {section.lectures.map((lecture, index) => {
                        const hasVideo = lecture.videoUrl?.includes(
                          "drive.google.com/file/d/",
                        );
                        const icon = hasVideo ? (
                          <MonitorPlay size={18} />
                        ) : (
                          <File size={18} />
                        );
                        return (
                          <li
                            key={lecture.id}
                            className="flex items-center font-medium gap-2"
                          >
                            {icon}
                            <label>{lecture.name}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </WhiteBox>
        </div>
        <div className="md:w-2/5 lg:w-1/3">
          <WhiteBox>
            <img
              className="border rounded-lg "
              src={data.profilePictureLink || "/placeholder-course.jpg"}
            />
          </WhiteBox>
        </div>
      </div>
    </HomeLayout>
  );
}
