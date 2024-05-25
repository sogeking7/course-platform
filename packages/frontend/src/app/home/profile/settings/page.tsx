import { TypographyH1 } from "@/components/ui/typography";
import { UserEditForm } from "@/components/user/edit/form";

export default function ProfileSettings() {
  return (
    <div>
      <TypographyH1>Manage Your Account</TypographyH1>
      <UserEditForm />
    </div>
  );
}
