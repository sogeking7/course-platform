import { axiosPublic } from "@/lib/axios";
import { Course } from "@/types";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // const data: Course[] = (await axiosPublic.get(`/course`)).data;
  // const courses = data.map((course) => ({
  //   url: `/course/${course.id}`,
  //   lastModified: new Date(),
  // }));

  return [
    {
      url: "https://shoqan-edu.kz",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://shoqan-edu.kz/about",
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: "https://shoqan-edu.kz/home/all-courses",
      lastModified: new Date(),
      priority: 0.8,
    },
    // ...courses,
  ];
}
