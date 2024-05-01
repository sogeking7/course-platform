import { HomeHeader } from "@/components/header";
import { LogoHome } from "@/components/logo";
import {
  SideBar,
  SideBarResizable,
  SideBarSkeleton,
} from "@/components/sidebar";
import { useSidebar } from "../../../hooks/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <SideBarResizable />
      <div className="fixed top-0 w-full bg-white">
        <HomeHeader />
      </div>
      <main className="h-full w-full overflow-y-auto flex">
        <SideBarSkeleton />
        <div className="w-full pt-[73px]">{children}</div>
      </main>
    </div>
  );
}
