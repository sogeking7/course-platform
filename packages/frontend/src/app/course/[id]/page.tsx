import { LayoutLoader } from "@/components/loader";
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
import { axiosPublic } from "@/lib/axios";
import { Suspense, cache } from "react";
import { Course } from "@/types";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getCourse = cache(async (id: number) => {
  const data: Course = (await axiosPublic.get(`/course/public/${id}`)).data;
  return data;
});

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = Number(params.id);

  // fetch data
  const data = await getCourse(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.name,
    openGraph: {
      images: [
        data.profilePictureLink || "/placeholder-course.jpg",
        ...previousImages,
      ],
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const id = Number(params.id);
  const data = await getCourse(id);

  const breadcrumbs = [{ name: " Курстар", path: "/home/all-courses" }];

  return (
    <Suspense fallback={<LayoutLoader />}>
      <HomeLayout>
        <Bread breadcrumbs={breadcrumbs} />
        <div className="flex gap-4 md:gap-2 lg:gap-6 md:flex-row flex-col-reverse">
          <div className="flex flex-col gap-4 md:gap-2 lg:gap-6 md:w-3/5 lg:w-2/3">
            <WhiteBox>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="mt-4">{data.description}</p>
            </WhiteBox>
            <WhiteBox>
              <TypographyH2>Курс мазмұны</TypographyH2>
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
                        index === 0 ? "rounded-t-xl" : "",
                        index === data.sections.length - 1
                          ? "rounded-b-xl"
                          : "",
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
                          const hasVideo = lecture.videoUrl?.includes(
                            "drive.google.com/file/d/",
                          );
                          const icon = hasVideo ? (
                            <MonitorPlay size={14} />
                          ) : (
                            <File size={14} />
                          );
                          return (
                            <li
                              key={lecture.id}
                              className="flex items-center gap-4"
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
    </Suspense>
  );
}
