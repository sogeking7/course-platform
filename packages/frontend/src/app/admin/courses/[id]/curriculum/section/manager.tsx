"use client";

import React, { useState } from "react";
import Form from "./form";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { LectureManager } from "./lecture/manager";
import { Section } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSectionStore } from "@/store/section";
import { MyAlert } from "@/components/my-alert";

type Props = {
  courseId: number;
  sections: Section[];
};

export const CourseSectionManager = (props: Props) => {
  const queryClient = useQueryClient();
  const sectionStore = useSectionStore();

  const [mode, setMode] = useState<"edit" | "default" | "new">("default");
  const [edits, setEdits] = useState<number[]>([]);

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
            className="p-4 sm:p-6 bg-white sm:bg-neutral-100 rounded-lg border border-neutral-300"
          >
            {!edits.find((x) => section.id === x) && (
              <div className="flex w-full justify-end max-sm:flex-wrap gap-4 items-center">
                <label className="block font-bold w-full">
                  Модуль {index + 1}:{" "}
                  <span className=" text-gray-700 ">{section.name}</span>
                </label>
                <div className="flex gap-2">
                  <Button
                    size={"icon"}
                    onClick={() => setEdits((x) => [...x, section.id])}
                  >
                    <Pencil size={16} />
                  </Button>
                  <MyAlert
                    name={section.name}
                    id={section.id}
                    mutation={mutationDelete}
                  />
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
        <div className="border bg-white border-neutral-300 rounded-lg p-6">
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
