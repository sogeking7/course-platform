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
import { useEffect } from "react";

export const MySheetTrigger = () => {
  const { isMySheetOpen, setIsMySheetOpen } = useSidebar();
  return (
    <Button
      onClick={() => setIsMySheetOpen(!isMySheetOpen)}
      size={"reset"}
      variant={"ghost"}
      className="opacity-70 p-3 hover:opacity-100"
    >
      {isMySheetOpen ? <X /> : <MenuIcon />}
    </Button>
  );
};

export const MySheet = (props: any) => {
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
          <div className="w-full py-1 flex justify-center border-b shadow-sm">
            <LogoHome />
          </div>
        </SheetHeader>
        <SideBar isLoggedIn={props.isLoggedIn} isSheet />
      </SheetContent>
    </Sheet>
  );
};

export const SideBarTrigger = () => {
  const pathname = usePathname();
  const { isSideBarOpen, setIsSideBarOpen } = useSidebar();

  if (pathname.includes("/learning")) {
    return <MySheetTrigger />;
  }
  return (
    <Button
      onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      size={"reset"}
      variant={"ghost"}
      className="opacity-70 p-3 hover:opacity-100"
    >
      {isSideBarOpen ? <X /> : <MenuIcon />}
    </Button>
  );
};

export const SideBar = ({
  isSheet = false,
  noText = false,
  isLoggedIn,
}: any) => {
  const pathname = usePathname();

  return (
    <nav className="my-1">
      <ul className="space-y-1">
        {sidebar_links.map((item) => {
          if (!isLoggedIn && item.auth) return null;
          return (
            <li className="w-full" key={item.title}>
              <SideBarButton
                noText={noText}
                isSheet
                pathname={pathname}
                item={item}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const SideBarSkeleton = () => {
  const pathname = usePathname();
  const { isSideBarOpen } = useSidebar();

  if (!isSideBarOpen || pathname.includes("/learning")) {
    return (
      <aside className="min-w-[77px] max-xl:hidden min-h-screen max-h-full"></aside>
    );
  }
  return (
    <aside className="min-w-[300px] max-xl:hidden min-h-screen max-h-full"></aside>
  );
};

export const SideBarResizable = (props: any) => {
  const pathname = usePathname();
  const { isSideBarOpen } = useSidebar();

  if (!isSideBarOpen || pathname.includes("/learning")) {
    return (
      <aside className="max-xl:hidden pt-[57px] fixed border-r min-h-screen max-h-full ">
        <SideBar isLoggedIn={props.isLoggedIn} noText />
      </aside>
    );
  }

  return (
    <aside className="max-xl:hidden min-w-[300px] pt-[57px] fixed border-r min-h-screen max-h-full ">
      <SideBar isLoggedIn={props.isLoggedIn} />
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
        "w-full justify-start font-normal",
        "py-4 pr-6 pl-6 rounded-none gap-4 border-transparent  border-l-4",
        pathname === item.href
          ? "bg-neutral-200 border-neutral-700 hover:bg-neutral-100 "
          : "hover:border-neutral-100 hover:bg-neutral-100",
      )}
      variant={"sidebar"}
      size={"reset"}
      asChild
    >
      <Link href={item.href}>
        <i className="text-neutral-700">{item.icon}</i>
        {noText ? null : (
          <label className="text-neutral-900">{item.title}</label>
        )}
      </Link>
    </Button>
  );
};
