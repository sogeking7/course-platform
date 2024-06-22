import {
  Award,
  BookOpen,
  Home,
  LayoutDashboard,
  LibraryBig,
  Trophy,
  Users,
  UsersRound,
} from "lucide-react";

export const default_links = [
  {
    title: "Басты бет",
    href: "/",
    icon: <Home size={20} />,
  },
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    icon: <LibraryBig size={20} />,
  },
];

export const sidebar_links = [
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    icon: <BookOpen size={20} />,
  },
  {
    title: "Емтихандар",
    href: "/home/my-exams",
    icon: <Trophy size={20} />,
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
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Қолданушылар",
    href: "/admin/users",
    icon: <UsersRound size={20} />,
  },
  {
    title: "Курстар",
    href: "/admin/courses",
    icon: <LibraryBig size={20} />,
  },
  {
    title: "Емтихандар",
    href: "/admin/exams",
    icon: <Trophy size={20} />,
  },
  // {
  //   title: "Менің курстарым",
  //   href: "/home/my-courses",
  //   icon: <BookOpen size={20} />,
  // },
];

export const kazakhVariants = [
  "а)", // similar to 'a'
  "б)", // similar to 'b'
  "с)", // similar to 'c'
  "д)", // similar to 'd'
  "е)", // similar to 'e'
];
