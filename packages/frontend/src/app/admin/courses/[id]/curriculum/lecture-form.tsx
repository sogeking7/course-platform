import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { File } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1),
});

export const AdminCourseCurriculumLectureForm = ({
  onAddLecture,
  setOpen,
}: any) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    criteriaMode: "all",
  });

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    const newLecture = {
      id: crypto.randomUUID(),
      title: data.name,
    };
    onAddLecture(newLecture);
    reset();
  };

  return (
    <div className="border bg-white border-neutral-300 rounded-sm p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex gap-4 items-center">
          <label className="block  font-bold min-w-max">New Lecture:</label>
          <Input {...register("name")} placeholder="Enter a title" />
        </div>
        <div className="flex justify-end w-full gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Add Lecture</Button>
        </div>
      </form>
    </div>
  );
};
