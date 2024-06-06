"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { admin_links, default_links, sidebar_links } from "../../public/shared";

import { CircleX, MenuIcon, X } from "lucide-react";
import { useSidebar } from "@/store/sidebar";
import { Sheet, SheetHeader, SheetContent } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MySheetTrigger = () => {
  const { isMySheetOpen, setIsMySheetOpen } = useSidebar();
  return (
    <button
      onClick={() => setIsMySheetOpen(!isMySheetOpen)}
      className="hover:bg-slate-300 bg-slate-200 text-neutral-700 w-[50px] h-[40px] flex items-center justify-center hover:opacity-100"
    >
      {isMySheetOpen ? (
        <div className="!w-6 !h-6 border-neutral-700  rounded-full border flex items-center justify-center">
          <X size={16} />
        </div>
      ) : (
        <MenuIcon strokeWidth={2.25} size={20} className="rounded-none" />
      )}
    </button>
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
      <SheetContent className="w-[285px] h-full bg-white" side={"left"}>
        <SheetHeader className="py-3 px-20 !h-[50px] flex items-center border-b border-neutral-300 shadow-sm">
          <Logo />
        </SheetHeader>
        <SideBar str />
      </SheetContent>
    </Sheet>
  );
};

export const SideBarTrigger = () => {
  const pathname = usePathname();
  const { isSideBarOpen, setIsSideBarOpen } = useSidebar();

  if (pathname.includes("/lecture")) {
    return <MySheetTrigger />;
  }
  return (
    <button
      onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      className="hover:bg-slate-300 bg-slate-200 text-neutral-700 w-[50px] h-[40px] flex items-center justify-center "
    >
      {isSideBarOpen ? (
        <div className="h-[24px] w-[24px] border-neutral-700 rounded-full border flex items-center justify-center">
          <X size={16} />
        </div>
      ) : (
        // <CircleX size={20}/>
        <MenuIcon strokeWidth={2.25} size={20} className="rounded-none" />
      )}
    </button>
  );
};

export const SideBar = ({ noText = false }: any) => {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  return (
    <nav className="my-[2px] h-full bg-white">
      <ul className="space-y-1">
        {default_links.map((item) => (
          <li className="w-full" key={item.title}>
            <SideBarButton noText={noText} isSheet item={item} />
          </li>
        ))}
      </ul>
      {role === "USER" && (
        <ul className="space-y-1 mt-1">
          {sidebar_links.map((item) => (
            <li className="w-full" key={item.title}>
              <SideBarButton noText={noText} isSheet item={item} />
            </li>
          ))}
        </ul>
      )}
      {role === "ADMIN" && (
        <>
          <hr className="my-2" />
          <ul className="space-y-1">
            {admin_links.map((item) => (
              <li className="w-full" key={item.title}>
                <SideBarButton noText={noText} isSheet item={item} />
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export const SideBarSkeleton = () => {
  const pathname = usePathname();
  const { isSideBarOpen } = useSidebar();

  if (!isSideBarOpen || pathname.includes("/lecture")) {
    return (
      <aside className="min-w-[68px] max-xl:hidden min-h-screen max-h-full"></aside>
    );
  }
  return (
    <aside className="min-w-[285px] max-xl:hidden min-h-screen max-h-full"></aside>
  );
};

export const SideBarResizable = (props: any) => {
  const pathname = usePathname();
  const { isSideBarOpen } = useSidebar();

  if (!isSideBarOpen || pathname.includes("/lecture")) {
    return (
      <aside className="max-xl:hidden z-10 bg-white pt-[50px] fixed border-r border-neutral-300 min-h-screen max-h-full ">
        <SideBar noText />
      </aside>
    );
  }

  return (
    <aside className="max-xl:hidden bg-white min-w-[285px] pt-[50px] fixed border-r border-neutral-300 min-h-screen max-h-full ">
      <SideBar />
    </aside>
  );
};

const SideBarButton = (props: any) => {
  const pathname = usePathname();
  const { item, isSheet, noText } = props;
  const { setIsMySheetOpen } = useSidebar();
  return (
    <TooltipProvider
      disableHoverableContent={true}
      delayDuration={0}
      skipDelayDuration={500}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={item.disabled}
            onClick={() => {
              if (isSheet) {
                setIsMySheetOpen(false);
              }
            }}
            className={cn(
              "w-full justify-start font-normal text-base",
              "py-[15px] pr-6 pl-6 rounded-none gap-2 border-transparent  border-l-[4px]",
              pathname === item.href
                ? "bg-neutral-200 border-[#1F2D5A] hover:bg-neutral-200/80 "
                : "hover:border-neutral-200/50 hover:bg-neutral-200/50",
            )}
            variant={"sidebar"}
            size={"reset"}
            asChild
          >
            <Link href={item.href}>
              <i className="text-neutral-700">{item.icon}</i>
              {noText ? null : (
                <label className="text-neutral-800 leading-tight">
                  {item.title}
                </label>
              )}
            </Link>
          </Button>
        </TooltipTrigger>
        {noText ? (
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        ) : (
          noText
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
