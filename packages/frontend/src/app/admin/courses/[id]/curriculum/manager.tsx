import React, { useState } from "react";
import { AdminCourseCurriculumSectionForm } from "./section-form";
import { Button } from "@/components/ui/button";
import { AdminCourseCurriculumLectureForm } from "./lecture-form";
import { File } from "lucide-react";

const CourseCurriculumManager = () => {
  const [sections, setSections] = useState([]);
  const [openSection, setOpenSection] = useState(false);

  const handleAddSection = (newSection) => {
    setOpenSection(false);
    console.log(newSection);
    setSections([...sections, newSection]);
  };

  return (
    <div className="space-y-6 list-none">
      {sections.length === 0 && !openSection && (
        <div className="bg-neutral-100 p-5 rounded-sm border border-neutral-300"></div>
      )}
      {sections.map((section, index) => {
        return (
          <li
            key={section.id}
            className=" p-5 bg-neutral-100 rounded-sm border border-neutral-300"
          >
            <label className="block font-bold min-w-max">
              Section {index + 1}:
              <span className="ml-2 text-gray-700 font-normal">
                {section.title}
              </span>
            </label>
            <LectureManager
              sections={sections}
              section={section}
              setSections={setSections}
            />
          </li>
        );
      })}
      {openSection ? (
        <AdminCourseCurriculumSectionForm
          setOpen={setOpenSection}
          onAddSection={handleAddSection}
        />
      ) : (
        <Button
          className="w-max mt-6"
          variant={"outline"}
          onClick={() => setOpenSection(true)}
        >
          + Section
        </Button>
      )}
    </div>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { useCourseStore } from "@/store/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tiptap } from "@/components/tip-tap";

const LectureManager = ({ section }) => {
  const [lectures, setLectures] = useState(section.lectures);
  const [openLecture, setOpenLecture] = useState(false);

  const handleAddLecture = (newLecture) => {
    setOpenLecture(false);
    console.log(newLecture);
    setLectures([...lectures, newLecture]);
  };

  return (
    <div className="mt-6 space-y-3 list-none">
      <Accordion type="multiple" className="gap-3 flex-col flex" collapsible>
        {lectures.map((lecture, index) => {
          return (
            <LectureItemForm index={index} key={lecture.id} data={lecture} />
          );
        })}
      </Accordion>
      {openLecture ? (
        <AdminCourseCurriculumLectureForm
          setOpen={setOpenLecture}
          onAddLecture={handleAddLecture}
        />
      ) : (
        <Button
          className="w-max"
          variant={"outline"}
          onClick={() => setOpenLecture(true)}
        >
          + Lecture
        </Button>
      )}
    </div>
  );
};

const lectureSchema = z.object({
  // name: z.string().min(1),
  content: z.string().min(1),
});

const LectureItemForm = ({ data, index }: { data: any; index: number }) => {
  const queryClient = useQueryClient();
  const courseStore = useCourseStore();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof lectureSchema>>({
    resolver: zodResolver(lectureSchema),
    criteriaMode: "all",
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => 0,
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      setError("root.serverError", {
        type: errorData.statusCode.toString(),
        message: errorData.message,
      });
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["course", { id: courseId }] });
    },
  });

  const onSubmit = (data: z.infer<typeof lectureSchema>) => {
    mutation.mutate();
  };

  return (
    <AccordionItem value={`item-${data.id}`}>
      <AccordionTrigger className="w-full bg-white px-3 py-4  border border-neutral-300">
        <label className=" flex items-center min-w-max">
          <File size={14} className="mr-2" /> Lecture {index + 1}:
          <span className="ml-2 text-gray-700 font-normal">{data.title}</span>
        </label>
      </AccordionTrigger>
      <AccordionContent className="py-4 border-neutral-300 border-t-none bg-white border-x border-b">
        <Tiptap placeholder={"Контент"} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseCurriculumManager;
