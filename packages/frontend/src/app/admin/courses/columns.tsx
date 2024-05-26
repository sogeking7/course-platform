"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: "Аты",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}/invite`}>
                <UserRoundPlus className="mr-1" size={18} />
                Оқушы қосу
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${course.id}`}>
                <Pencil className="mr-1" size={18} />
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
