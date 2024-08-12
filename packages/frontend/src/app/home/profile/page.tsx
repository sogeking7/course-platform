import { WhiteBox } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography";
import { UserEditForm } from "@/components/user/edit/form";

export default function ProfileSettings() {
  return (
    <div>
      <TypographyH1>Жеке ақпарат</TypographyH1>
      <WhiteBox>
        <div className="w-full flex justify-center">
          <UserEditForm />
        </div>
      </WhiteBox>
    </div>
  );
}
