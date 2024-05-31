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
import { File } from "lucide-react";
import HomeLayout from "@/app/home/layout";
import { Bread } from "@/components/bread";
import { TypographyH2 } from "@/components/ui/typography";

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
    { name: data.name, path: "/learning/" + id },
  ];

  return (
    <HomeLayout>
      <Bread breadcrumbs={breadcrumbs} />
      <div className="p-5 w-full bg-white rounded-sm border">
        <div className="flex gap-6">
          {/* <div className="w-full max-w-[420px] h-[250px] bg-neutral-400 rounded-sm"></div> */}
          <div>
            <img
              className="min-w-[240px] max-w-[300px]"
              src={data.profilePictureLink || ""}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="mt-4">{data.description}</p>
          </div>
        </div>
      </div>
      <article className="prose !max-w-full my-6 p-5 border bg-white rounded-sm w-full">
        {/* <TypographyH2>Cипаттамасы</TypographyH2> */}
        <ReactMarkdown className="w-full" rehypePlugins={[rehypeRaw]}>
          {data.content}
        </ReactMarkdown>
      </article>
      <div className="border rounded-sm bg-white p-5">
        <TypographyH2>Курс контенты</TypographyH2>
        <Accordion
          type="multiple"
          className="gap-0 border-t-none border-x border-b  flex-col flex"
          /* @ts-ignore */
          collapsible={true}
        >
          {data.sections.map((section, index) => (
            <AccordionItem key={section.id} value={`item-${section.id}`}>
              <AccordionTrigger className="w-full bg-white px-5 py-4  border-t ">
                <label className=" flex gap-2 items-center min-w-max">
                  {/* <File size={14} /> */}
                  {/* <span>sections {index + 1}:</span> */}
                  <span className=" text-gray-700 font-semibold">
                    {section.name}
                  </span>
                </label>
              </AccordionTrigger>
              <AccordionContent className="py-4 px-5 border-t  bg-white">
                <ul className="flex flex-col gap-4">
                  {section.lectures.map((lecture, index) => (
                    <li key={lecture.id} className="flex items-center gap-4">
                      <File size={14} />
                      <label>{lecture.name}</label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </HomeLayout>
  );
}
