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
    <Link
      href={link ? link : `/course/${item.id}`}
      className="shadow-md rounded-sm hover:shadow-[#8f96ac]"
    >
      {/* <div className="rounded-t-sm h-[200px] bg-neutral-400 w-full" /> */}
      <div>
        <img src={item.profilePictureLink || ""} />
      </div>
      <div className="min-h-[150px] pt-5 pb-4 px-4 rounded-b-sm border bg-white">
        <h1 className="line-clamp-two  font-semibold line-clamp-one">
          {item.name}
        </h1>
        <p className="line-clamp-two text-[#78819c] mt-4 text-sm ">
          {item.description}
        </p>
      </div>
    </Link>
  );
};
