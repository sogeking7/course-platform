import { TypographyH1 } from "@/components/ui/typography";
import { UserEditForm } from "@/components/user/edit/form";
import { UserPictureForm } from "@/components/user/edit/picture-form";

export default function ProfileSettings() {
  return (
    <div>
      <TypographyH1>Баптаулар</TypographyH1>
      <UserPictureForm />
      <UserEditForm />
    </div>
  );
}
