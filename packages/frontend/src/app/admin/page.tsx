import HomeLayout from "../home/layout";
import { TypographyH1 } from "@/components/ui/typography";

export default function HomePage() {
  return (
    <>
      <TypographyH1>Админ панель</TypographyH1>
      <div className="rounded-sm border bg-white p-5">Қош келдініз 👋</div>
    </>
  );
}
