"use client";

import HomeLayout from "@/app/home/layout";
import { MyContainer } from "@/components/container";
import { AccordionContents } from "@/components/course/accordion-contents";
import { LayoutLoader } from "@/components/loader";
import { useCourseStore } from "@/store/course";
import { useQuery } from "@tanstack/react-query";
import { ListCollapse } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function CoursePage({ params }) {
  const id = Number(params.id);

  const courseStore = useCourseStore();

  const { data, isLoading } = useQuery({
    queryKey: ["course", { id }],
    queryFn: () => courseStore.findCourseById(id),
  });

  if (isLoading) {
    return (
      <HomeLayout>
        <LayoutLoader />
      </HomeLayout>
    );
  }

  return (
    <HomeLayout withContainer={false} withFooter={false}>
      <div className="flex h-full">
        <div className="max-w-[350px] min-w-[350px] pb-10 h-[calc(100vh-55px)] bg-neutral-800 text-slate-50 overflow-scroll ">
          <button className="p-5 text-left bg-neutral-800 z-10 flex font-bold items-center fixed w-[350px] border-b border-b-zinc-700">
            <ListCollapse className="mr-4" />
            Contents
          </button>
          <div className="pt-[69px] min-h-[calc(100% - 69px)] z-[5]">
            <AccordionContents />
          </div>
        </div>
        <MyContainer>
          <article className="prose !max-w-full mt-4 w-full">
            <ReactMarkdown className="w-full" rehypePlugins={[rehypeRaw]}>
              {data.description}
            </ReactMarkdown>
          </article>
        </MyContainer>
      </div>
    </HomeLayout>
  );
}
