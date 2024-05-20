import { MyContainer } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography";
import { UserInfoBox } from "@/components/user/user-btn";

export default function ProfilePage() {
  return (
    <MyContainer>
      <TypographyH1>Profile</TypographyH1>
      <UserInfoBox />
    </MyContainer>
  );
}
