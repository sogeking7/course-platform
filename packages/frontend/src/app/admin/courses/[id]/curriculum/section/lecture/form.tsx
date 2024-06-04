import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exam, Lecture, createExamSchema, createLectureSchema } from "@/types";
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
import { BookCheck, Loader, Loader2, Plus, Trash } from "lucide-react";
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
import Link from "next/link";
import { useExamStore } from "@/store/exam";

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
  const examStore = useExamStore();

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

  const mutationCreateExam = useMutation({
    mutationFn: (newData: any) => examStore.create(data?.id!, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", { id: courseId }],
      });
    },
  });

  const mutationDeleteExam = useMutation({
    mutationFn: (id: any) => examStore.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", { id: courseId }],
      });
    },
  });

  const handleCreateExam = () => {
    const newExam: z.infer<typeof createExamSchema> = {
      name: `Quiz`,
      description: `Quiz: ${data?.name}`,
      questions: "[]",
      lectureId: data?.id!,
    };
    mutationCreateExam.mutate(newExam);
  };

  const handleDeleteExam = (id: number) => {
    mutationDeleteExam.mutate(id);
  };

  const onSubmit = (data: z.infer<typeof createLectureSchema>) => {
    mutation.mutate(data);
  };

  const videoUrl = convertToPreviewLink(form.getValues("videoUrl"));

  return (
    <Form {...form}>
      {mode === "edit" && (
        <div className="w-full justify-end flex mb-6 gap-4">
          {data?.exam ? (
            <>
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
                      Quiz: {data?.name!}
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
                    <AlertDialogAction
                      onClick={() => handleDeleteExam(data?.exam?.id!)}
                    >
                      {mutationDeleteExam.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Жалғастыру
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link
                href={`/admin/courses/${courseId}/curriculum/section/lecture/${data?.id!}/${data.exam.id}`}
              >
                <Button>
                  <BookCheck size={16} className="mr-2" />
                  Quiz
                </Button>
              </Link>
            </>
          ) : (
            <Button variant={"outline"} onClick={handleCreateExam}>
              {mutationCreateExam.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus size={16} className="mr-2" />
              )}
              Жаңа quiz
            </Button>
          )}
        </div>
      )}
      {videoUrl && (
        <div className="p-4 mb-6 relative aspect-video min-w-[240px] max-w-[300px] overflow-hidden ">
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
