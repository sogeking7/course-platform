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
      className="shadow-md border bg-white  rounded-sm hover:shadow-[#8f96ac]"
    >
      {/* <div className="rounded-t-sm h-[200px] bg-neutral-400 w-full" /> */}
      <img className="border rounded-t-sm" src={item.profilePictureLink || ""} />
      <div className="min-h-[80.75px] pt-5 pb-4 px-4 border-x border-b rounded-b-sm bg-white">
        <h1 className="line-clamp-two  font-semibold line-clamp-one">
          {item.name}
        </h1>
        {/* <p className="line-clamp-two text-[#78819c] mt-4 text-sm ">
          {item.description}
        </p> */}
      </div>
    </Link>
  );
};
