import { MyContainer } from "@/components/container";
import { Footer } from "@/components/footer";
import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";

export default function HomeLayout({
  children,
  withContainer = true,
  withFooter = true,
}: {
  withContainer?: boolean;
  withFooter?: boolean;
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
        {withContainer ? (
          <div className="relative pb-[calc(226px+48px)] sm:pb-[calc(138px+48px)] w-full pt-[55px] bg-[#F5F5F5]">
            <MyContainer>{children}</MyContainer>
            <Footer />
          </div>
        ) : (
          <div className="relative w-full pt-[55px] bg-[#F5F5F5]">
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
