import { HomeHeader } from "@/components/header/home/header";
import { SideBar } from "@/components/sidebar";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
      <SideBar />
      <main className="h-full w-full overflow-y-auto">{children}</main>
    </div>
  );
}
