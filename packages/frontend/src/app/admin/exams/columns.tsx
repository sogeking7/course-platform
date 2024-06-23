"use client";

import { Exam } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  MoreHorizontal,
  Pencil,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import Moment from "react-moment";
import "moment/locale/kk";

export const columns: ColumnDef<Exam>[] = [
  {
    id: "icon",
    header: "#",
    cell: ({ row }) => {
      return <img src="/icons/test.png" className="inline min-w-7 min-h-7" />;
    },
  },
  {
    accessorKey: "name",
    header: "Аты",
  },
  {
    accessorKey: "description",
    header: "Жөні",
  },
  {
    accessorKey: "questions",
    header: "Сұрақтар саны",
    cell: ({ row }) => {
      const questionsCont = JSON.parse(row.original.questions).length;
      return questionsCont;
    },
  },
  // {
  //   accessorKey: "questions",
  //   header: "Оқушылар саны",
  //   cell: ({ row }) => {
  //     return row.original?.invitedExam?.length || 0;
  //   },
  // },
  {
    header: "Құрылған күні",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <Moment format="DD-MM-YYYY" date={date} />;
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
      const id = row.original.id;

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
            <DropdownMenuItem asChild>
              <Link href={`/admin/exams/invite/${id}`}>
                <UserRoundPlus className="mr-2" size={20} />
                Оқушы қосу
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/exams/edit/${id}`}>
                <Pencil className="mr-2" size={20} />
                Өңдеу
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/exams/results/${id}`}>
                <ClipboardList className="mr-2" size={20} />
                Нәтижелер
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
