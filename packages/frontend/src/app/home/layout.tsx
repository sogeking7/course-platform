"use client";

import { MyContainer } from "@/components/container";
import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hide = pathname.includes("/lecture");

  return (
    <div className="flex w-full min-h-screen bg-[#F0F2F5] dark:bg-[#121212]">
      <SideBarResizable />
      <main className="w-full flex ">
        <SideBarSkeleton />
        <div
          className={cn(
            hide ? "" : "xl:w-[calc(100%-320px)]",
            "w-[calc(100%-75px)] max-sm:w-full",
          )}
        >
          <MyContainer className={"max-sm:border-b max-sm:bg-white !py-2.5"}>
            <HomeHeader />
          </MyContainer>
          <MyContainer>{children}</MyContainer>
        </div>
      </main>
    </div>
  );
}
