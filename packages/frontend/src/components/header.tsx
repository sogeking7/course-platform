import UserButton from "./user/widgets";
import { MySheet, MySheetTrigger, SideBarTrigger } from "./sidebar";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/shoqan-edu.svg";

export const HomeHeader = (props: any) => {
  return (
    <header className="px-4 flex relative z-[1000] py-2 h-[56px] w-full border-b border-neutral-300  shadow-sm bg-white">
      <div className="flex items-center w-full justify-between gap-8">
        <div className="flex gap-6 items-center">
          {/* <div className="max-xl:hidden">
            <SideBarTrigger />
          </div> */}
          <div className="xl:hidden">
            <MySheetTrigger />
          </div>
          <div className="ml-3 max-xl:hidden w-[120px] md:w-[140px]">
            <Link href="/" className="w-[120px] md:w-[140px]">
              <Image
                alt="Logo"
                src={logo}
                sizes="100vw"
                // Make the image display full width
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          </div>
          <MySheet />
        </div>
        <div className="gap-5 flex items-center">
          <UserButton />
        </div>
      </div>
    </header>
  );
};
