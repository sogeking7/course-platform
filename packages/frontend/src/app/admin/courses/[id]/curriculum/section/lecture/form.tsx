import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lecture, createExamSchema, createLectureSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tiptap } from "@/components/tip-tap";
import { BookCheck, ClipboardList, Loader2, Plus } from "lucide-react";
import { useLectureStore } from "@/store/lecture";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn, convertToPreviewLink } from "@/lib/utils";
import Link from "next/link";
import { useExamStore } from "@/store/exam";
import { MyAlert } from "@/components/my-alert";
import { Switch } from "@/components/ui/switch";

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
      content_checked: data?.content ? true : false,
      videoUrl_checked: data?.videoUrl ? true : false,
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
    mutationFn: (id: number) => lectureStore.delete(id),
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
    mutationFn: (id: number) => examStore.delete(id),
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

  const onSubmit = (data: z.infer<typeof createLectureSchema>) => {
    const { content_checked, videoUrl_checked, ...edited } = data;
    edited.content = content_checked ? edited.content : "";
    edited.videoUrl = videoUrl_checked ? edited.videoUrl : "";
    mutation.mutate(edited);
  };

  const videoUrl = convertToPreviewLink(form.getValues("videoUrl"));

  return (
    <Form {...form}>
      {mode === "edit" && (
        <div className="w-full justify-end max-sm:flex-wrap flex mb-6 gap-4">
          {data?.exam ? (
            <>
              <MyAlert
                name={`Quiz: ${data?.name!}`}
                id={data?.exam?.id!}
                mutation={mutationDeleteExam}
              />
              <Link
                href={`/admin/courses/${courseId}/curriculum/section/lecture/${data?.id!}/${data.exam.id}`}
              >
                <Button>
                  <BookCheck size={16} className="mr-2" />
                  Quiz
                </Button>
              </Link>
              <Link
                href={`/admin/courses/${courseId}/curriculum/section/lecture/${data?.id!}/${data.exam.id}/results`}
              >
                <Button variant={"outline"}>
                  <ClipboardList size={16} className="mr-2" />
                  Нәтижелер
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
        className="border bg-white border-neutral-300 rounded-xl p-4 space-y-4"
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
        <hr className="border-none" />
        <FormField
          control={form.control}
          name="content_checked"
          render={({ field }) => (
            <div className="border-neutral-300 border rounded-xl p-4 flex flex-col gap-4">
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Мазмұн қосу</FormLabel>
                  <FormDescription>Текст</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
              {form.getValues("content_checked") && (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Мазмұн</FormLabel>
                      <FormControl>
                        <Tiptap
                          placeholder={"Мазмұн"}
                          editorState={field.value || ""}
                          setEditorState={field.onChange}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="videoUrl_checked"
          render={({ field }) => (
            <div className="border-neutral-300 border rounded-xl p-4 flex flex-col gap-4">
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Видео қосу</FormLabel>
                  <FormDescription>Google Drive сілтемесі</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
              {form.getValues("videoUrl_checked") && (
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
              )}
            </div>
          )}
        />
        <div className="flex justify-end max-sm:flex-wrap  w-full gap-4">
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
            <MyAlert
              name={data?.name!}
              id={data?.id!}
              mutation={mutationDelete}
            />
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
