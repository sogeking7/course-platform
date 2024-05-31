import { TypographyH1 } from "@/components/ui/typography";
import { UserEditForm } from "@/components/user/edit/form";
import { UserPictureForm } from "@/components/user/edit/picture-form";

export default function ProfileSettings() {
  return (
    <div>
      <TypographyH1>Баптаулар</TypographyH1>
      <div className="w-full p-5 flex-col items-center bg-white border rounded-sm">
        <div className="w-full flex justify-center mb-6">
          <UserPictureForm />
        </div>
        <div className="w-full flex justify-center">
          <UserEditForm />
        </div>
      </div>
    </div>
  );
}
