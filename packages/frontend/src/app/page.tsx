import HomeLayout from "./home/layout";
import { MyContainer } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <HomeLayout>
      <MyContainer>
        <TypographyH1>Басты бет</TypographyH1>
      </MyContainer>
    </HomeLayout>
  );
}
