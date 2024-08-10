import { cn } from "@/lib/utils";
import { Course } from "../../types";
import Link from "next/link";

export const CourseCard = ({
  item,
  link = "",
}: {
  item: Course;
  link?: string;
}) => {
  return (
    <Link href={link ? link : `/course/${item.id}`}>
      <div className="relative hover:underline flex sm:flex-col-reverse max-sm:flex-row bg-white border-2 p-3 rounded-3xl  transition-all">
        <div className="py-2 pb-8 h-min sm:pt-4 max-sm:pl-0 max-sm:pr-4 w-full">
          <h1 className="font-semibold break-all line-clamp-2">{item.name}</h1>
        </div>
        <img
          className={cn(
            "object-cover",
            "rounded-2xl max-sm:aspect-square sm:aspect-video",
            "max-sm:w-[80px] max-sm:h-[80px]",
          )}
          src={item.profilePictureLink || "/placeholder-course.jpg"}
        />
        <span className="absolute bottom-3 left-3 text-sm text-neutral-500">
          Курс
        </span>
      </div>
    </Link>
  );
};
