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
  defaultValue = [],
  sections,
  courseId,
}: {
  defaultValue?: string[];
  courseId: number;
  sections: Section[];
}) => {
  return (
    <Accordion
      defaultValue={defaultValue}
      type="multiple"
      className="w-full relative "
    >
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
                <Link
                  key={lecture.id}
                  href={`/learning/${courseId}/lecture/${lecture.id}`}
                  className="cursor-pointer"
                >
                  <li className="pt-3 pb-5 hover:underline flex cursor-pointer">
                    <div className="min-w-3 h-3 rounded-full border mr-3 relative top-[5px]"></div>
                    {lecture.name}
                  </li>
                </Link>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
