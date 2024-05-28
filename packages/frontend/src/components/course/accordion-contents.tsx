"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/types";
import Link from "next/link";

export const AccordionContents = ({
  sections,
  courseId,
}: {
  courseId: number;
  sections: Section[];
}) => {
  return (
    <Accordion type="multiple" className="w-full relative ">
      {sections.map((section, index) => (
        <AccordionItem
          className="border-b border-b-zinc-700"
          key={section.id}
          value={`section-${section.id}`}
        >
          <AccordionTrigger className="p-5 text-left text-sm font-bold">
            {section.name}
          </AccordionTrigger>
          <AccordionContent className="border-t border-t-zinc-700 text-sm font-normal">
            <ul>
              {section.lectures.map((lecture, jndex) => (
                <li
                  className="pt-3 pb-5 hover:underline flex cursor-pointer"
                  key={lecture.id}
                >
                  <div className="min-w-3 h-3 rounded-full border mr-3 relative top-[5px]"></div>
                  <Link
                    href={`/learning/${courseId}/lecture/${lecture.id}`}
                    className="cursor-pointer"
                  >
                    {lecture.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
