import { Editor } from "@/components/editor";
import { GoBackButton } from "@/components/go-back-button";
import { TypographyH1 } from "@/components/ui/typography";

export default function AdminCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <>
      <div className="flex items-start">
        <GoBackButton />
        <TypographyH1>Курс {id} </TypographyH1>
      </div>
      <Editor />
    </>
  );
}
