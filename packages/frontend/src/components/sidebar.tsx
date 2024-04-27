"use client";

import Link from "next/link";
import { Logo, LogoHome } from "./logo";
import { Button } from "./ui/button";
import { Apple, BookOpen, LibraryBig } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DarkModeSwitch } from "./darkmode-switch";

const links = [
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

export const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-w-[360px] p-6 bg-slate-50/50 border-r min-h-screen max-h-full space-y-8">
      <div className="w-full flex justify-center">
        <LogoHome />
      </div>
      <nav>
        <ul className="space-y-4">
          {links.map((item) => (
            <li className="w-full" key={item.title}>
              <SideBarButton pathname={pathname} item={item} />
            </li>
          ))}
        </ul>
      </nav>
      {/* <DarkModeSwitch /> */}
    </aside>
  );
};

const SideBarButton = (props: any) => {
  const { item, pathname } = props;
  return (
    <Button
      disabled={item.disabled}
      className={cn(
        "w-full justify-start",
        "text-slate-900",
        "py-4 px-8 rounded-xl gap-4",
        pathname === item.href
          ? "bg-blue-500 text-white"
          : "hover:bg-slate-200/45",
      )}
      variant={"sidebar"}
      size={"reset"}
      asChild
    >
      <Link href={item.href}>
        {/* <Apple className="mr-3" /> */}
        {item.icon}
        {item.title}
      </Link>
    </Button>
  );
};
