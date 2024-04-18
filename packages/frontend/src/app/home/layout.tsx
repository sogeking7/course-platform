import { HomeHeader } from '@/components/home-header';
import { SideBar } from '@/components/sidebar';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="min-w-[340px] h-full">
        <SideBar />
      </div>
      <main className=" h-full w-full">{children}</main>
    </div>
  );
}
