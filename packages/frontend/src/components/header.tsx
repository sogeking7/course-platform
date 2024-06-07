import { Logo } from "./logo";
import UserButton from "./user/widgets";
import { MySheet, MySheetTrigger, SideBarTrigger } from "./sidebar";

export const HomeHeader = (props: any) => {
  return (
    <header className="pl-3 pr-4 flex relative z-[1000] py-2 h-[50px] w-full border-b border-neutral-300  shadow-sm bg-white">
      <div className="flex items-center w-full justify-between gap-8">
        <div className="flex gap-6 items-center">
          <div className="max-xl:hidden">
            <SideBarTrigger />
          </div>
          <div className="xl:hidden">
            <MySheetTrigger />
          </div>
          <div className="max-xl:hidden w-[120px] md:w-[130px]">
            <Logo />
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
