import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lecture } from "@/types";
import { useState } from "react";
import Form from "./form";
import { Button } from "@/components/ui/button";
import { File, Plus } from "lucide-react";

type Props = {
  courseId: number;
  sectionId: number;
  lectures: Lecture[];
};

export const LectureManager = (props: Props) => {
  const [mode, setMode] = useState<"edit" | "default" | "new">("default");
  const [values, setValues] = useState<string[]>([]);

  const closeAccordionItem = (itemId: string) => {
    setValues((prevValues) => prevValues.filter((value) => value !== itemId));
  };

  return (
    <div className="mt-6 space-y-3 list-none">
      <Accordion
        value={values}
        onValueChange={setValues}
        type="multiple"
        className="gap-3 flex-col flex"
        /* @ts-ignore */
        collapsible={true}
      >
        {props.lectures.map((lecture, index) => (
          <AccordionItem key={lecture.id} value={`item-${lecture.id}`}>
            <AccordionTrigger className="w-full bg-white px-3 py-4 border  border-neutral-300">
              <label className=" flex gap-2 items-center min-w-max">
                <File size={14} />
                <span>Сабақ {index + 1}:</span>
                <span className=" text-gray-700 ">{lecture.name}</span>
              </label>
            </AccordionTrigger>
            <AccordionContent className="p-5 border-neutral-300 border-t-none bg-white border-x border-b">
              <Form
                onEditSave={() => closeAccordionItem(`item-${lecture.id}`)}
                sectionId={props.sectionId}
                courseId={props.courseId}
                data={lecture}
                mode={"edit"}
                setOpen={setMode}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {mode === "new" && (
        <Form
          sectionId={props.sectionId}
          courseId={props.courseId}
          mode={"new"}
          setOpen={setMode}
        />
      )}
      {mode !== "new" && (
        <Button
          className="w-max"
          variant={"outline"}
          onClick={() => setMode("new")}
        >
          <Plus size={20} className="mr-2" />
          Сабақ
        </Button>
      )}
    </div>
  );
};
