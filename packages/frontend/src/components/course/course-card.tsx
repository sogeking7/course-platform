import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Course } from "../../types";
import Link from "next/link";

export const CourseCard = ({ item }: { item: Course }) => {
  return (
    <div className="">
      <div className="rounded-t-sm h-[200px] bg-neutral-300 w-full" />
      <div className="pt-3 pb-4 px-4 rounded-b-sm border flex flex-col gap-4 bg-slate-50/50">
        <h1 className="text-slate-800 font-medium line-clamp-one">
          {item.name}
        </h1>
        <Button
          asChild
          // className={cn(
          //   "px-4 py-2",
          //   // "rounded-xl",
          //   "bg-transparent border-blue-500 text-blue-500 hover:text-slate-50 hover:bg-blue-500",
          // )}
          // variant={"outline"}
          // size={"reset"}
        >
          <Link href={`/learning/${item.id}`}>Open</Link>
        </Button>
      </div>
    </div>
  );
};
