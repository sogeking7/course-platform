"use client";

import { MyContainer } from "@/components/container";
import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hide = pathname.includes("/lecture");

  return (
    <div className="flex w-full min-h-screen bg-[#F0F2F5]">
      <SideBarResizable />
      <main className="w-full flex">
        <SideBarSkeleton />
        <div
          className={cn(
            hide ? "" : "xl:w-[calc(100%-320px)]",
            "w-[calc(100%-75px)]",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
