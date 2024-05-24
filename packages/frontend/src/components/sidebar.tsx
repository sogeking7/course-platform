"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { admin_links, default_links, sidebar_links } from "../../public/shared";

import { MenuIcon, X } from "lucide-react";
import { useSidebar } from "@/store/sidebar";
import { Sheet, SheetHeader, SheetContent } from "@/components/ui/sheet";
import { LogoHome } from "./logo";
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
    <Button
      onClick={() => setIsMySheetOpen(!isMySheetOpen)}
      size={"reset"}
      variant={"ghost"}
      className="text-neutral-700 w-[67px] h-[47px] flex items-center justify-center hover:opacity-100"
    >
      {isMySheetOpen ? (
        <div className="w-6 h-6 border-neutral-700  rounded-full border flex items-center justify-center">
          <X size={18} />
        </div>
      ) : (
        <MenuIcon />
      )}
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
          <div className="w-full py-1 border-b px-20 border-neutral-300 shadow-sm">
            <LogoHome />
          </div>
        </SheetHeader>
        <SideBar />
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
      className=" text-neutral-700 w-[67px] h-[47px] flex items-center justify-center hover:opacity-100"
    >
      {isSideBarOpen ? (
        <div className="w-6 h-6 border-neutral-700  rounded-full border flex items-center justify-center">
          <X size={18} />
        </div>
      ) : (
        <MenuIcon size={20} />
      )}
    </Button>
  );
};

export const SideBar = ({ noText = false }: any) => {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  return (
    <nav className="my-1">
      <ul className="space-y-1">
        {default_links.map((item) => (
          <li className="w-full" key={item.title}>
            <SideBarButton noText={noText} isSheet item={item} />
          </li>
        ))}
      </ul>
      {role === "USER" && (
        <ul className="space-y-1">
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
      <aside className="max-xl:hidden pt-[54px] fixed border-r border-neutral-300 min-h-screen max-h-full ">
        <SideBar noText />
      </aside>
    );
  }

  return (
    <aside className="max-xl:hidden min-w-[300px] pt-[54px] fixed border-r border-neutral-300 min-h-screen max-h-full ">
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
              "w-full justify-start font-normal",
              "py-4 pr-6 pl-6 rounded-none gap-3.5 border-transparent  border-l-[4px]",
              pathname === item.href
                ? "bg-neutral-200 border-neutral-700 hover:bg-neutral-200/80 "
                : "hover:border-neutral-200 hover:bg-neutral-200/50",
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
