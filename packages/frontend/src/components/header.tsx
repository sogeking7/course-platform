import { LogoHome } from "./logo";
import { UserButton } from "./user/user-btn";
import { MySheet, MySheetTrigger, SideBarTrigger } from "./sidebar";

export const HomeHeader = (props: any) => {
  return (
    <header className="pl-1 pr-6 py-[3px] w-full border-b border-neutral-300  shadow-sm bg-white">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-2 items-center">
          <div className="max-xl:hidden">
            <SideBarTrigger />
          </div>
          <div className="xl:hidden">
            <MySheetTrigger />
          </div>
          <LogoHome />
          <MySheet />
        </div>
        <div className="gap-5 flex items-center">
          <UserButton />
        </div>
      </div>
    </header>
  );
};
