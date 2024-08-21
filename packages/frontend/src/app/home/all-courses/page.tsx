"use client";

import { TypographyH1 } from "@/components/ui/typography";
import { LayoutLoader } from "@/components/loader";
import { AllCoursesList } from "./list";
import { axiosPublic } from "@/lib/axios";
import { Metadata } from "next";
import { useQuery } from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "Курстар",
// };

export default function AllCoursesPage() {
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["course"],
    queryFn: async () => (await axiosPublic.get(`/course`)).data,
  });

  if (!data || isLoading) {
    return <LayoutLoader />;
  }

  return (
    <>
      <TypographyH1>Курстар</TypographyH1>
      <AllCoursesList data={data} />
    </>
  );
}
