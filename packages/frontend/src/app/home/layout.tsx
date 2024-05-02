import { HomeHeader } from "@/components/header";
import { SideBarResizable, SideBarSkeleton } from "@/components/sidebar";
import { cookies } from "next/headers";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = cookies().get("session")?.value ? true : false;

  return (
    <div className="flex w-full min-h-screen">
      <SideBarResizable isLoggedIn={isLoggedIn} />
      <div className="fixed top-0 w-full bg-white z-50">
        <HomeHeader isLoggedIn={isLoggedIn} />
      </div>
      <main className="w-full overflow-y-auto flex">
        <SideBarSkeleton />
        <div className="w-full pt-[57px]">{children}</div>
      </main>
    </div>
  );
}
