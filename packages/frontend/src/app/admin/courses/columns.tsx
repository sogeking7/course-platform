"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleFadingPlus,
  MoreHorizontal,
  Pencil,
  UserRoundPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Moment from "react-moment";
import "moment/locale/kk";

export const columns: ColumnDef<Course>[] = [
  {
    id: "icon",
    header: "#",
    cell: () => {
      const image = "/icons/course.png";
      return <img src={image} className="inline min-w-7 min-h-7" />;
    },
  },
  {
    accessorKey: "name",
    header: "Аты",
  },
  {
    accessorKey: "description",
    header: "Сипаттамасы",
  },
  {
    header: "Құрылған күні",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <Moment locale="kk" format="DD-MM-YYYY" date={date} />;
    },
  },
  {
    header: "Өңделген күні",
    accessorKey: "editedAt",
    cell: ({ row }) => {
      const date = row.original.editedAt;
      return <Moment locale="kk" date={date} fromNow />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              variant="ghost"
              className="!min-h-8 !min-w-8 p-0"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/curriculum`}>
                <CircleFadingPlus className="mr-2" size={20} />
                Курс бағдарламасы
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/invite`}>
                <UserRoundPlus className="mr-2" size={20} />
                Оқушы қосу
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}`}>
                <Pencil className="mr-2" size={20} />
                Өңдеу
              </Link>
            </DropdownMenuItem>

            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Cипаттамасы",
  // },
];
