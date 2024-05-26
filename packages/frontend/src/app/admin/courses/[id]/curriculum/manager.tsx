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
        <div className="bg-neutral-100 p-5 rounded-sm border border-neutral-400"></div>
      )}
      {sections.map((section, index) => {
        return (
          <li
            key={section.id}
            className=" p-5 bg-neutral-100 rounded-sm border border-neutral-400"
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
      {lectures.map((lecture, index) => {
        return (
          <li
            key={lecture.id}
            className="bg-white px-3 py-4 rounded-sm border border-neutral-400"
          >
            <label className=" flex items-center min-w-max">
              <File size={14} className="mr-2" /> Lecture {index + 1}:
              <span className="ml-2 text-gray-700 font-normal">
                {lecture.title}
              </span>
            </label>
          </li>
        );
      })}
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

export default CourseCurriculumManager;
