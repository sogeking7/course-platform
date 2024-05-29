import HomeLayout from "./home/layout";
import { TypographyH1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <HomeLayout>
      <div>
        <TypographyH1>Басты бет</TypographyH1>
        <div className="rounded-sm border bg-white p-5">Қош келдініз 👋</div>
      </div>
    </HomeLayout>
  );
}
