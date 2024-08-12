import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#F0F2F5]">
      <SideBarResizable />
      <main className="w-full flex">
        <SideBarSkeleton />
        <div className="w-[calc(100%-75px)]">
          <>{children}</>
        </div>
      </main>
    </div>
  );
}
