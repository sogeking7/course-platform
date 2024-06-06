import {
  BookOpen,
  Home,
  LayoutDashboard,
  LibraryBig,
  Users,
  UsersRound,
} from "lucide-react";

export const default_links = [
  {
    title: "Басты бет",
    href: "/",
    icon: <Home size={18} />,
  },
  {
    title: "Барлық курстар",
    href: "/home/all-courses",
    icon: <LibraryBig size={18} />,
  },
];

export const sidebar_links = [
  {
    title: "Менің курстарым",
    href: "/home/my-courses",
    icon: <BookOpen size={18} />,
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
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "Қолданушылар",
    href: "/admin/users",
    icon: <UsersRound size={18} />,
  },
  {
    title: "Курстар",
    href: "/admin/courses",
    icon: <LibraryBig size={18} />,
  },
  // {
  //   title: "Менің курстарым",
  //   href: "/home/my-courses",
  //   icon: <BookOpen size={18} />,
  // },
];

export const kazakhVariants = [
  "а)", // similar to 'a'
  "б)", // similar to 'b'
  "с)", // similar to 'c'
  "д)", // similar to 'd'
  "е)", // similar to 'e'
];
