"use client";

import React, { useState } from "react";
import Form from "./form";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
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
  const [edits, setEdits] = useState<number[]>([]);

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
            className="p-6 bg-neutral-100 rounded-2xl border border-neutral-300"
          >
            {!edits.find((x) => section.id === x) && (
              <div className="flex w-full justify-between items-center">
                <label className="block font-bold min-w-max">
                  Модуль {index + 1}:
                  <span className="ml-2 text-gray-700 ">{section.name}</span>
                </label>
                <div className="flex gap-2">
                  <Button
                    size={"icon"}
                    onClick={() => setEdits((x) => [...x, section.id])}
                  >
                    <Pencil size={16} />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"destructive"}
                        onClick={handleDelete}
                      >
                        <Trash size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                          <Trash
                            size={20}
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
                          {mutationDelete.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Жалғастыру
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
            {edits.find((x) => section.id === x) && (
              <>
                <Form
                  data={section}
                  courseId={props.courseId}
                  mode={"edit"}
                  setOpen={setMode}
                  setEdits={setEdits}
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
        <div className="border bg-white border-neutral-300 rounded-xl p-6">
          <Form courseId={props.courseId} mode={mode} setOpen={setMode} />
        </div>
      )}
      {mode !== "new" && (
        <Button
          className="w-max"
          variant={"outline"}
          onClick={() => setMode("new")}
        >
          <Plus size={20} className="mr-2" />
          Модуль
        </Button>
      )}
    </div>
  );
};
