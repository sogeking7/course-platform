import {
  Award,
  Book,
  BookOpen,
  Home,
  LayoutDashboard,
  LayoutGrid,
  LibraryBig,
  Trophy,
  Users,
  UsersRound,
} from "lucide-react";

export const default_links = [
  {
    title: "Басты бет",
    href: "/",
    icon: <Home strokeWidth={1.8} />,
  },
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    icon: <Book strokeWidth={1.8} />,
  },
];

export const sidebar_links = [
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    icon: <BookOpen strokeWidth={1.8} />,
  },
  {
    title: "Емтихандар",
    href: "/home/my-exams",
    icon: <Trophy strokeWidth={1.8} />,
  },
  // {
  //   title: "Байқау тесті",
  //   href: "#",
  //   disabled: true,
  // },
];

export const admin_links = [
  {
    title: "Админ панель",
    href: "/admin",
    icon: <LayoutGrid strokeWidth={1.8} />,
  },
  {
    title: "Оқушылар",
    href: "/admin/users",
    icon: <UsersRound strokeWidth={1.8} />,
  },
  {
    title: "Курстар",
    href: "/admin/courses",
    icon: <LibraryBig strokeWidth={1.8} />,
  },
  {
    title: "Емтихандар",
    href: "/admin/exams",
    icon: <Trophy strokeWidth={1.8} />,
  },
  // {
  //   title: "Менің курстарым",
  //   href: "/home/my-courses",
  //   icon: <BookOpen  strokeWidth={1.8} />,
  // },
];

export const kazakhVariants = [
  "а)", // similar to 'a'
  "б)", // similar to 'b'
  "с)", // similar to 'c'
  "д)", // similar to 'd'
  "е)", // similar to 'e'
];
