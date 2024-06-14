import { TypographyH1 } from "@/components/ui/typography";
import { AdminUsersCreateForm } from "./form";
import { Bread } from "@/components/bread";

export default async function AdminUsersCreatePage() {
  const breadcrumbs = [{ name: " Қолданушылар", path: "/admin/users" }];
  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Жаңа қолданушы</TypographyH1>
      <AdminUsersCreateForm />
    </>
  );
}
