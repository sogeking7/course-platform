import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import NotFoundImage from "@/../public/not-found.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '404'
}

export default function NotFound() {
  return (
    <div className="w-full flex h-screen justify-center pt-[20vh] bg-[#F0F2F5]">
      <header className="absolute  top-0  h-[56px]  flex w-full items-center border-b border-neutral-300  shadow-sm bg-white">
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-start items-center">
          <Logo />
        </div>
      </header>
      <div className="flex flex-col min-w-[320px] items-center gap-8">
        <Image alt="not-found" src={NotFoundImage} width={360} height={200} />
        <Link href="/">
          <Button>Басты бетке қайту</Button>
        </Link>
      </div>
    </div>
  );
}
