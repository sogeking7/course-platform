import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToPreviewLink(url: string): string | null {
  // Check if the URL is a Google Drive link
  if (url.includes("drive.google.com/file/d/")) {
    // Replace '/view?usp=sharing' with '/preview'
    return url.replace("/view?usp=sharing", "/preview");
  } else {
    return null;
  }
}

export const calcPercentage = (
  correct_answers: number,
  total_answers: number,
): number => {
  return (correct_answers * 100) / total_answers;
};
