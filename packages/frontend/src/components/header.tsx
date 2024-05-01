import { LogoHome } from "./logo";
import { UserButton } from "./user/user-btn";
import { MySheet, MySheetTrigger, SideBarTrigger } from "./sidebar";

export const HomeHeader = () => {
  return (
    <header className="px-6 py-3 w-full border-b">
      <div className="flex items-center w-full justify-between">
        <div className="flex gap-6 items-center">
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
