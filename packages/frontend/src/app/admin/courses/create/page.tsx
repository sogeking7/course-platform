import { TypographyH1 } from "@/components/ui/typography";
import { GoBackButton } from "@/components/go-back-button";
import { AdminUsersCreateForm } from "./form";

export default async function AdminUsersCreatePage() {
  return (
    <>
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Жаңа курс</TypographyH1>
      </div>
      <AdminUsersCreateForm />
    </>
  );
}
