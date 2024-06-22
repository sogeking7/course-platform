import { TypographyH1 } from "@/components/ui/typography";
import { AdminUsersCreateForm } from "./form";
import { Bread } from "@/components/bread";
import { WhiteBox } from "@/components/container";

export default async function AdminUsersCreatePage() {
  const breadcrumbs = [{ name: "Емтихандар", path: "/admin/exams" }];
  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Жаңа Quiz</TypographyH1>
      <WhiteBox>
        <AdminUsersCreateForm />
      </WhiteBox>
    </>
  );
}
