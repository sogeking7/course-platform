import { BookOpen, Home, LibraryBig } from "lucide-react";

export const sidebar_links = [
  {
    title: "Басты бет",
    href: "/",
    disabled: false,
    icon: <Home />,
    auth: false,
  },
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    disabled: false,
    icon: <LibraryBig />,
    auth: true,
  },
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    disabled: false,
    icon: <BookOpen />,
    auth: true,
  },
  // {
  //   title: "Байқау тесті",
  //   href: "#",
  //   disabled: true,
  // },
];
