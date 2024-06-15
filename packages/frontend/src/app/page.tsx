import { WhiteBox } from "@/components/container";
import HomeLayout from "./home/layout";
import { TypographyH1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <HomeLayout>
      <div>
        <TypographyH1>Басты бет</TypographyH1>
        <WhiteBox>Қош келдіңіз 👋</WhiteBox>
      </div>
    </HomeLayout>
  );
}
