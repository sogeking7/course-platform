import { TypographyH1 } from "@/components/ui/typography";
import { AdminCourseCreateForm } from "./form";
import { Bread } from "@/components/bread";

export default async function AdminUsersCreatePage() {
  const breadcrumbs = [{ name: " Курстар", path: "/admin/courses" }];

  return (
    <>
      <Bread breadcrumbs={breadcrumbs} />
      <TypographyH1>Жаңа курс</TypographyH1>
      <AdminCourseCreateForm mode="create" />
    </>
  );
}
