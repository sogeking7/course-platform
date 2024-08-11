import { MyContainer } from "@/components/container";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen bg-[#F0F2F5]">
      <SideBarResizable />
      <main className="w-full flex ">
        <SideBarSkeleton />
        <div className="w-[calc(100%-75px)] xl:w-[calc(100%-320px)]">
          <MyContainer>{children}</MyContainer>
        </div>
      </main>
    </div>
  );
}
