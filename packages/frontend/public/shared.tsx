import { BookOpen, LibraryBig } from "lucide-react";

export const sidebar_links = [
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    disabled: false,
    icon: <LibraryBig />,
  },
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    disabled: false,
    icon: <BookOpen />,
  },
  // {
  //   title: "Байқау тесті",
  //   href: "#",
  //   disabled: true,
  // },
];