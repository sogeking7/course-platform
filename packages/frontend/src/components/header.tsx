import { DarkModeSwitch } from "./darkmode-switch";
import { SideBarSheet } from "./sidebar";
import UserButton from "./user/widgets";

export const HomeHeader = (props: any) => {
  return (
    <header className="flex items-center w-full justify-end max-sm:justify-between gap-4 sm:mb-10">
      {/* <DarkModeSwitch /> */}
      <SideBarSheet />
      <UserButton />
    </header>
  );
};
