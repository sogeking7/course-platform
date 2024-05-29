import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lecture, createLectureSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
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
import { Loader2, Trash } from "lucide-react";
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
import { useLectureStore } from "@/store/lecture";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn, convertToPreviewLink } from "@/lib/utils";

type Props = {
  sectionId: number;
  courseId: number;
  data?: Lecture;
  onEditSave?: () => void;
  mode: "edit" | "default" | "new";
  setOpen: Dispatch<SetStateAction<"edit" | "default" | "new">>;
};

export default function LectureForm({
  courseId,
  sectionId,
  data,
  mode,
  onEditSave,
  setOpen,
}: Props) {
  const queryClient = useQueryClient();
  const lectureStore = useLectureStore();

  const form = useForm<z.infer<typeof createLectureSchema>>({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      name: data?.name || "",
      content: data?.content || "",
      videoUrl: data?.videoUrl || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      // return / new Promise(resolve => setTimeout(resolve, 3000));
      if (mode === "edit") {
        return lectureStore.update(data?.id!, newData);
      }
      return lectureStore.create({
        sectionId,
        ...newData,
        examId: 0,
      });
    },
    onSuccess: () => {
      // if (mode === "edit")
      queryClient.invalidateQueries({
        queryKey: ["course", { id: courseId }],
      });
      if (mode === "new") {
        form.reset({
          name: "",
          content: "",
        });
        setOpen("default");
      } else {
        onEditSave!();
      }
      form.reset(form.getValues());
    },
  });

  const mutationDelete = useMutation({
    mutationFn: () => lectureStore.delete(data?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", { id: courseId }],
      });
      setOpen("default");
    },
  });

  const onSubmit = (data: z.infer<typeof createLectureSchema>) => {
    mutation.mutate(data);
  };

  const videoUrl = convertToPreviewLink(form.getValues("videoUrl"));

  return (
    <Form {...form}>
      {videoUrl && (
        <div className="p-4 mb-6 relative aspect-video w-full overflow-hidden pt-[calc(56.25%)]">
          <iframe
            src={videoUrl}
            className={cn(
              "w-full h-full absolute top-0 left-0 right-0 bottom-0",
            )}
            // onLoad={() => setVideoLoading(false)}
            // allow="autoplay"
          />
        </div>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border bg-white border-neutral-300 rounded-sm p-4 space-y-3"
      >
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Видеоға сілтеме</FormLabel>
              <FormControl>
                <Input placeholder="URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
              Болдырмау
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
                      size={20}
                      className="inline-block mr-2 text-destructive"
                    />
                    Өшіру: {data?.name!}
                    {/* Сіз мүлдем сенімдісіз бе? */}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Бұл әрекетті қайтару мүмкін емес. Бұл сіздің есептік
                    жазбаңызды біржола жояды және деректеріңізді біздің
                    серверлерден жояды.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpen("default")}>
                    Болдырмау
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => mutationDelete.mutate()}>
                    {mutationDelete.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Жалғастыру
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button disabled={!form.formState.isDirty} type="submit">
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "new" ? "Косу" : "Сақтау"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
