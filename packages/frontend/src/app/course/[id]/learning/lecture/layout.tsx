import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";

export default function LearningLayout({
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
        <div className="relative w-full pt-[56px] overflow-y-auto bg-[#F0F2F5]">
          <div className="flex h-full sm:flex-row flex-col">{children}</div>
        </div>
      </main>
    </div>
  );
}
