import { TypographyH1 } from "@/components/ui/typography";
import { LayoutLoader } from "@/components/loader";
import { AllCoursesList } from "./list";
import { Suspense } from "react";
import { axiosPublic } from "@/lib/axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Курстар",
};

export default async function AllCoursesPage() {
  const data = (await axiosPublic.get(`/course`)).data;

  return (
    <>
      <Suspense fallback={<LayoutLoader />}>
        <TypographyH1>Курстар</TypographyH1>
        <AllCoursesList data={data} />
      </Suspense>
    </>
  );
}
