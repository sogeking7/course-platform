"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { admin_links, default_links, sidebar_links } from "../../public/shared";
import { Logo, LogoSmall } from "./logo";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogIn, LogOut } from "lucide-react";

export const SideBar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  return (
    <nav className="my-4 h-full dark:bg-transparent bg-white transition-none">
      <ul className="space-y-2">
        {default_links.map((item) => (
          <li className={cn("px-3", "w-full")} key={item.title}>
            <SideBarButton item={item} />
          </li>
        ))}
      </ul>
      {role === "USER" && (
        <ul className="space-y-1 mt-2">
          {sidebar_links.map((item) => (
            <li className={cn("px-3", "w-full")} key={item.title}>
              <SideBarButton item={item} />
            </li>
          ))}
        </ul>
      )}
      {role === "ADMIN" && (
        <>
          <hr className="my-2 dark:border"/>
          <ul className="space-y-2">
            {admin_links.map((item) => (
              <li className={cn("px-3", "w-full")} key={item.title}>
                <SideBarButton item={item} />
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

  const hide = pathname.includes("/lecture");

  return (
    <aside
      className={cn(
        "min-w-[75px]",
        hide ? "" : "xl:min-w-[320px]",
        "min-h-screen max-h-full",
      )}
    ></aside>
  );
};

export const SideBarResizable = () => {
  const pathname = usePathname();

  const hide = pathname.includes("/lecture");

  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <aside
      className={cn(
        "z-10 fixed",
        "min-w-[75px]",
        hide ? "" : "xl:min-w-[320px]",
        "bg-white  dark:bg-[#1f1f1f] flex flex-col justify-between py-8 fixed border-r border-neutral-300 dark:border-neutral-700 min-h-screen max-h-full ",
      )}
    >
      <div>
        <div
          className={cn(hide ? "hidden" : "max-xl:hidden", "w-full px-5 pb-5")}
        >
          <div className="ml-3 w-[160px]">
            <Logo />
          </div>
        </div>
        <div
          className={cn(
            hide ? "" : "xl:hidden",
            "w-full px-2 pb-4 flex justify-center",
          )}
        >
          <div className="w-[30px]">
            <LogoSmall />
          </div>
        </div>
        <SideBar />
      </div>
      <div className={cn("px-3", "w-full")}>
        {status === "loading" || !user ? (
          <SideBarButton
            item={{
              title: "Кіру",
              href: "",
              icon: <LogIn size={26} strokeWidth={1.8} />,
              action: signIn,
            }}
          />
        ) : (
          <SideBarButton
            item={{
              title: "Шығу",
              href: "",
              icon: <LogOut size={26} strokeWidth={1.8} />,
              action: signOut,
            }}
          />
        )}
      </div>
    </aside>
  );
};

const SideBarButton = ({
  item,
}: {
  item: {
    title: string;
    href: string;
    action?: any;
    icon: JSX.Element;
  };
}) => {
  const pathname = usePathname();
  const hide = pathname.includes("/lecture");

  return (
    <TooltipProvider
      disableHoverableContent={true}
      delayDuration={0}
      skipDelayDuration={500}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "items-center",
              hide ? "" : "p-3 xl:justify-start xl:pl-4 xl:pr-2",
              "p-3",
              "!min-w-[50px] w-full !transition-none font-normal file:text-base",
              "gap-3",
              pathname === item.href
                ? "bg-neutral-200 dark:bg-neutral-700 font-medium hover:bg-neutral-200/80 "
                : "hover:border-neutral-200/50 dark:bg-transparent hover:bg-neutral-200/50",
            )}
            onClick={() => {
              if (item.action) {
                return item.action();
              }
            }}
            variant={"sidebar"}
            size={"reset"}
            asChild
          >
            <Link href={item.href}>
              <i className="dark:text-white text-neutral-700">{item.icon}</i>
              <label
                className={cn(
                  hide ? "hidden" : "max-xl:hidden",
                  "dark:text-white text-neutral-800",
                )}
              >
                {item.title}
              </label>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className={cn(hide ? "" : "xl:hidden")} side="right">
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
