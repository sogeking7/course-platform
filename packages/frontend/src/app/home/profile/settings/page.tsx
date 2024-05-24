import { TypographyH1 } from "@/components/ui/typography";
import { UserInfoBox } from "@/components/user/widgets";

export default function ProfileSettings() {
  return (
    <div>
      <TypographyH1>Manage Your Account</TypographyH1>
      <UserInfoBox />
    </div>
  );
}
