import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen">
      <SideBarResizable />
      <div className="fixed top-0 w-full bg-white z-50">
        <HomeHeader />
      </div>
      <main className="w-full overflow-y-auto flex">
        <SideBarSkeleton />
        <div className="w-full pt-[57px]">{children}</div>
      </main>
    </div>
  );
}
