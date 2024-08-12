import { DarkModeSwitch } from "./darkmode-switch";
import UserButton from "./user/widgets";

export const HomeHeader = (props: any) => {
  return (
    <header className="flex items-center w-full justify-end gap-4">
      <DarkModeSwitch />
      <UserButton />
    </header>
  );
};
