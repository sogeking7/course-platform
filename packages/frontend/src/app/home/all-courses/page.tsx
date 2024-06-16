"use server";

import { TypographyH1 } from "@/components/ui/typography";
import { LayoutLoader } from "@/components/loader";
import { AllCoursesList } from "./list";
import { Suspense } from "react";
import axios from "@/lib/axios";

export default async function AllCoursesPage() {
  const data = (await axios.get(`/course`)).data;

  return (
    <>
      <Suspense fallback={<LayoutLoader />}>
        <TypographyH1>Курстар</TypographyH1>
        <AllCoursesList data={data} />
      </Suspense>
    </>
  );
}
