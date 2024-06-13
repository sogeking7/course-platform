"use client";

import { LayoutLoader } from "@/components/loader";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { File, MonitorPlay } from "lucide-react";
import HomeLayout from "@/app/home/layout";
import { Bread } from "@/components/bread";
import { TypographyH2 } from "@/components/ui/typography";
import { WhiteBox } from "@/components/container";
import { cn } from "@/lib/utils";

export default function CoursePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const courseStore = useCourseStore();

  const { data, isLoading } = useQuery({
    queryKey: ["course", { id }],
    queryFn: () => courseStore.findCourseById(id),
  });

  if (isLoading || !data) {
    return <LayoutLoader />;
  }

  const breadcrumbs = [
    { name: "Курстар", path: "/home/all-courses" },
    { name: data.name, path: "/course/" + id },
  ];

  return (
    <HomeLayout>
      <Bread breadcrumbs={breadcrumbs} />
      <WhiteBox>
        <div className="flex gap-6 xl:flex-row flex-col">
          {/* <div className="w-full max-w-[420px] h-[250px] bg-neutral-400 rounded-xl"></div> */}
          <div>
            <img
              className="sm:min-w-[240px] border rounded-2xl sm:max-w-[300px]"
              src={data.profilePictureLink || ""}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="mt-4">{data.description}</p>
          </div>
        </div>
      </WhiteBox>
      <WhiteBox>
        <div className="w-full mb-6">
          <article className="prose !max-w-full w-full ">
            {/* <TypographyH2>Cипаттамасы</TypographyH2> */}
            <ReactMarkdown className="w-full" rehypePlugins={[rehypeRaw]}>
              {data.content}
            </ReactMarkdown>
          </article>
        </div>
        <TypographyH2>Курс контенты</TypographyH2>
        <Accordion
          type="multiple"
          className="gap-0 border-t-none rounded-xl border-x border-b  flex-col flex"
          /* @ts-ignore */
          collapsible={true}
        >
          {data.sections.map((section, index) => (
            <AccordionItem key={section.id} value={`item-${section.id}`}>
              <AccordionTrigger
                className={cn(
                  "w-full bg-white px-5 py-4 border-t ",
                  index === 0 ? "rounded-t-xl" : "",
                  index === data.sections.length - 1 ? "rounded-b-xl" : "",
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
              <AccordionContent className="py-4 px-5 border-t  bg-white">
                <ul className="flex flex-col gap-4">
                  {section.lectures.map((lecture, index) => {
                    const hasVideo = lecture.videoUrl.includes(
                      "drive.google.com/file/d/",
                    );
                    const icon = hasVideo ? (
                      <MonitorPlay size={14} />
                    ) : (
                      <File size={14} />
                    );
                    return (
                      <li key={lecture.id} className="flex items-center gap-4">
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
    </HomeLayout>
  );
}
