import { Section } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPreviewLink(
  url: string | null | undefined,
): string | null {
  if (!url) return null;
  // Check if the URL is a Google Drive link
  if (url.includes("drive.google.com/file/d/")) {
    // Replace '/view?usp=sharing' with '/preview'
    return url.replace("/view?usp=sharing", "/preview");
  } else {
    return null;
  }
}

export const getFirstLectureId = (sections: Section[]): number | null => {
  for (let section of sections) {
    if (section.lectures && section.lectures.length > 0) {
      return section.lectures[0].id;
    }
  }
  return null; // Return null if no lectures are found
};

export const calcPercentage = (
  correct_answers: number,
  total_answers: number,
): number => {
  return (correct_answers * 100) / total_answers;
};

export const nextLecture = (lecture_id: number, sections: Section[]): number | null => {
  let nextLectureId: number | null = null;

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].lectures.length; j++) {
      const thisLectureId = sections[i].lectures[j].id;
      if (lecture_id === thisLectureId) {
        if (j < sections[i].lectures.length - 1) {
          nextLectureId = sections[i].lectures[j + 1].id;
        } 
        
        // else if (i < sections.length - 1) {
        //   const nextSectionLectures = sections[i + 1]?.lectures;
        //   if (nextSectionLectures && nextSectionLectures.length > 0) {
        //     nextLectureId = nextSectionLectures[0]?.id || null;
        //   } else {
        //     return null;
        //   }
        // } 
        
        else {
          return null;
        }
      }
    }
  }

  return nextLectureId;
};

export const prevLecture = (lecture_id: number, sections: Section[]): number | null => {
  let prevLectureId = null;

  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i].lectures.length; j++) {
      const thisLectureId = sections[i].lectures[j].id;
      if (lecture_id === thisLectureId) {
        if (j > 0) {
          prevLectureId = sections[i].lectures[j - 1].id;
        } 
        
        // else if (i > 0) {
        //   const previousSectionLectures = sections[i - 1]?.lectures;
        //   if (previousSectionLectures && previousSectionLectures.length > 0) {
        //     prevLectureId =
        //       previousSectionLectures[previousSectionLectures.length - 1].id;
        //   } else {
        //     return null;
        //   }
        // } 
        
        else {
          return null;
        }
      }
    }
  }

  return prevLectureId;
};
