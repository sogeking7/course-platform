"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MyContainer } from "@/components/container";
import { TypographyH1 } from "@/components/ui/typography"; // Assuming mock data is in the same directory
import { ListCollapse } from "lucide-react";
import { courseContent } from "../../../public/shared";

export const AccordionContents = () => {
  return (
    <Accordion type="multiple" className="w-full">
      {courseContent.map((module) => (
        <AccordionItem key={module.id} value={`module-${module.id}`}>
          <AccordionTrigger className="p-5 text-left text-sm font-bold">
            {module.title}
          </AccordionTrigger>
          <AccordionContent className="text-sm font-normal">
            <ul>
              {module.topics.map((topic) => (
                <li
                  className="pt-3 pb-5 hover:underline flex cursor-pointer"
                  key={topic.id}
                >
                  <div className="min-w-3 h-3 rounded-full border mr-3 relative top-[5px]"></div>
                  <label className="cursor-pointer">{topic.title}</label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
