import { cn } from "@/lib/utils";
import { Course } from "../../types";
import Link from "next/link";
import Image from "next/image";

export const CourseCard = ({
  item,
  link = "",
}: {
  item: Course;
  link?: string;
}) => {
  return (
    <Link href={link ? link : `/course/${item.id}`} className="h-full">
      <div className="relative sm:justify-end hover:underline flex h-full sm:flex-col-reverse max-sm:flex-row bg-white dark:bg-neutral-800 border border-zinc-300 dark:border-neutral-700 p-[18px] rounded-lg transition-all">
        <div className="my-2 sm:mt-4 max-sm:pl-0 max-sm:mr-4 w-full">
          <h1 className="font-semibold line-clamp-2">{item.name}</h1>
        </div>
        <div className="relative max-sm:min-w-[80px] max-sm:h-[80px] sm:w-full sm:aspect-video">
          <Image
            alt="course image"
            className={cn(
              "object-cover",
              "rounded-lg max-sm:aspect-square sm:aspect-video"
            )}
            src={item.profilePictureLink || "/placeholder-course.jpg"}
            fill // This makes the image fill its container while maintaining the aspect ratio
            sizes="(max-width: 640px) 80px, (min-width: 640px) 100vw" // Adjust the sizes attribute for better responsiveness
          />
        </div>
      </div>
    </Link>
  );
};
