"use client";

import React, { useState } from "react";
import Form from "./form";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import { LectureManager } from "./lecture/manager";
import { Section } from "@/types";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSectionStore } from "@/store/section";

type Props = {
  courseId: number;
  sections: Section[];
};

export const CourseSectionManager = (props: Props) => {
  const queryClient = useQueryClient();
  const sectionStore = useSectionStore();

  const [mode, setMode] = useState<"edit" | "default" | "new">("default");

  const handleDelete = () => {};

  const mutationDelete = useMutation({
    mutationFn: (id: number) => sectionStore.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", { id: props.courseId }],
      });
      setMode("default");
    },
  });

  return (
    <div className="space-y-6 list-none">
      {props.sections.map((section, index) => {
        return (
          <li
            key={section.id}
            className="p-5 bg-neutral-100 rounded-sm border border-neutral-300"
          >
            {mode !== "edit" && (
              <div className="flex w-full justify-between items-center">
                <label className="block font-bold min-w-max">
                  Section {index + 1}:
                  <span className="ml-2 text-gray-700 font-normal">
                    {section.name}
                  </span>
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => setMode("edit")}
                  >
                    <Pencil size={16} className="mr-2" /> Өзгерту
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"destructive"}
                        size={"sm"}
                        onClick={handleDelete}
                      >
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
                          Өшіру: {section.name}
                          {/* Сіз мүлдем сенімдісіз бе? */}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Бұл әрекетті қайтару мүмкін емес. Бұл сіздің есептік
                          жазбаңызды біржола жояды және деректеріңізді біздің
                          серверлерден жояды.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setMode("default")}>
                          Болдырмау
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => mutationDelete.mutate(section.id)}
                        >
                          Жалғастыру
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
            {mode === "edit" && (
              <>
                <Form
                  data={section}
                  courseId={props.courseId}
                  mode={mode}
                  setOpen={setMode}
                />
              </>
            )}
            <LectureManager
              courseId={props.courseId}
              sectionId={section.id}
              lectures={section.lectures}
            />
          </li>
        );
      })}
      {mode === "new" && (
        <div className="border bg-white border-neutral-300 rounded-sm p-4">
          <Form courseId={props.courseId} mode={mode} setOpen={setMode} />
        </div>
      )}
      {mode !== "new" && (
        <Button
          className="w-max"
          variant={"outline"}
          onClick={() => setMode("new")}
        >
          <Plus size={18} className="mr-2" />
          Section
        </Button>
      )}
    </div>
  );
};
