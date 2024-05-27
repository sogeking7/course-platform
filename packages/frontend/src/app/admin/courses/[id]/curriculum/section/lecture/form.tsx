import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lecture, createLectureSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Tiptap } from "@/components/tip-tap";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  data?: Lecture;
  mode: "edit" | "default" | "new";
  setOpen: Dispatch<SetStateAction<"edit" | "default" | "new">>;
};

export default function LectureForm({ data, mode, setOpen }: Props) {
  const form = useForm<z.infer<typeof createLectureSchema>>({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      name: data?.name || "",
      content: data?.content || "",
    },
  });

  const onSubmit = (data: z.infer<typeof createLectureSchema>) => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border bg-white border-neutral-300 rounded-sm p-4 space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {mode === "new" ? "Жаңа сабақ" : "Сабақтың аты"}
              </FormLabel>
              <FormControl>
                <Input placeholder="Аты" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контент</FormLabel>
              <FormControl>
                <Tiptap
                  placeholder={"Контент"}
                  editorState={field.value}
                  setEditorState={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full gap-4">
          {mode === "new" && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen("default")}
            >
              Cancel
            </Button>
          )}
          {mode === "edit" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                  <Trash size={16} className="mr-2" /> Өшіру
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center">
                    <Trash
                      size={18}
                      className="inline-block mr-2 text-destructive"
                    />
                    Өшіру: {data.name}
                    {/* Сіз мүлдем сенімдісіз бе? */}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Бұл әрекетті қайтару мүмкін емес. Бұл сіздің есептік
                    жазбаңызды біржола жояды және деректеріңізді біздің
                    серверлерден жояды.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                  <AlertDialogAction>Жалғастыру</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="submit">{mode === "new" ? "Косу" : "Сақтау"}</Button>
        </div>
      </form>
    </Form>
  );
}
