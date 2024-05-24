import HomeLayout from "../home/layout";
import { MyContainer } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <HomeLayout>
      <MyContainer>
        <TypographyH1>Админ панель</TypographyH1>
      </MyContainer>
    </HomeLayout>
  );
}
