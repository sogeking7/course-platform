import { MyContainer } from "@/components/container";
import { AccordionContents } from "@/components/course/accordion-contents";
import { ListCollapse } from "lucide-react";

export default function CoursePage() {
  return (
    <div className="flex h-full">
      <div className="max-w-[350px] min-w-[350px] pb-10 h-[calc(100vh-57px)] bg-neutral-800 text-slate-50 overflow-scroll ">
        <button className="p-5 text-left bg-neutral-800 z-10 flex font-bold items-center fixed w-[350px] border-b border-b-zinc-700">
          <ListCollapse className="mr-4" />
          Contents
        </button>
        <div className="pt-[69px] min-h-[calc(100% - 69px)] z-[5]">
          <AccordionContents />
        </div>
      </div>
      <MyContainer>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam fugiat
        ea et officiis sunt repellendus vitae illum hic repellat voluptates,
        velit excepturi esse corporis ad accusantium voluptatum ipsam,
        asperiores illo?
      </MyContainer>
    </div>
  );
}
