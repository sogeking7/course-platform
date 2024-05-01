"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { sidebar_links } from "../../public/shared";
import { MenuIcon, X } from "lucide-react";
import { useSidebar } from "../../hooks/sidebar";
import { LogoHome } from "./logo";
import { Sheet, SheetHeader, SheetContent } from "@/components/ui/sheet";

export const MySheetTrigger = () => {
  const { isMySheetOpen, setIsMySheetOpen } = useSidebar();
  return (
    <Button
      onClick={() => setIsMySheetOpen(!isMySheetOpen)}
      size={"reset"}
      variant={"ghost"}
      className="p-3 opacity-70 hover:opacity-100"
    >
      {isMySheetOpen ? <X /> : <MenuIcon />}
    </Button>
  );
};

export const MySheet = () => {
  const { isMySheetOpen, setIsMySheetOpen } = useSidebar();

  return (
    <Sheet
      open={isMySheetOpen}
      onOpenChange={() => {
        setIsMySheetOpen(!isMySheetOpen);
      }}
    >
      <SheetContent className="w-[360px]" side={"left"}>
        <SheetHeader>
          <div className="w-full py-3 flex justify-center border-b">
            <LogoHome />
          </div>
        </SheetHeader>
        <SideBar isSheet />
      </SheetContent>
    </Sheet>
  );
};

export const SideBarTrigger = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useSidebar();

  return (
    <Button
      onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      size={"reset"}
      variant={"ghost"}
      className="p-3 opacity-70 hover:opacity-100"
    >
      {isSideBarOpen ? <X /> : <MenuIcon />}
    </Button>
  );
};

export const SideBar = ({ isSheet = false, noText = false }: any) => {
  const pathname = usePathname();

  return (
    <nav className="my-1">
      <ul className="space-y-1">
        {sidebar_links.map((item) => (
          <li className="w-full" key={item.title}>
            <SideBarButton
              noText={noText}
              isSheet
              pathname={pathname}
              item={item}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const SideBarSkeleton = () => {
  const { isSideBarOpen } = useSidebar();
  if (isSideBarOpen) {
    return (
      <aside className="min-w-[91px] max-xl:hidden min-h-screen max-h-full"></aside>
    );
  }
  return (
    <aside className="min-w-[360px] max-xl:hidden min-h-screen max-h-full"></aside>
  );
};

export const SideBarResizable = () => {
  const { isSideBarOpen } = useSidebar();
  if (isSideBarOpen) {
    return (
      <aside className="max-xl:hidden min-w-[91px] pt-[73px] fixed border-r min-h-screen max-h-full ">
        <SideBar noText />
      </aside>
    );
  }
  return (
    <aside className="max-xl:hidden min-w-[360px] pt-[73px] fixed border-r min-h-screen max-h-full ">
      <SideBar />
    </aside>
  );
};

const SideBarButton = (props: any) => {
  const { item, pathname, isSheet, noText } = props;
  const { setIsMySheetOpen } = useSidebar();
  return (
    <Button
      disabled={item.disabled}
      onClick={() => {
        if (isSheet) {
          setIsMySheetOpen(false);
        }
      }}
      className={cn(
        "w-full justify-start",
        "text-slate-900",
        "py-5 pr-7 pl-8 rounded-none gap-4 border-transparent  border-l-4",
        pathname === item.href
          ? "bg-slate-200 border-slate-900"
          : "hover:bg-slate-100 hover:border-slate-100",
      )}
      variant={"sidebar"}
      size={"reset"}
      asChild
    >
      <Link href={item.href}>
        {item.icon}
        {noText ? null : item.title}
      </Link>
    </Button>
  );
};
