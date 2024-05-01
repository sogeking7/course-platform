import { MyContainer } from "@/components/container";
import { HomeHeader } from "@/components/header";
import { TypographyH1 } from "@/components/ui/typography";
import { UserInfoBox } from "@/components/user/user-btn";
import { getSession } from "@/lib";

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <MyContainer>
      <TypographyH1>Profile</TypographyH1>
      <UserInfoBox user={user} />
    </MyContainer>
  );
}
