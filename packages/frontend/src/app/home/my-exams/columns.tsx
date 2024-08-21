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
  ExternalLink,
  MoreHorizontal,
  Pencil,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import Moment from "react-moment";
import "moment/locale/kk";
import Image from "next/image";

export const columns: ColumnDef<Exam>[] = [
  {
    id: "icon",
    header: "#",
    cell: ({ row }) => {
      return <Image alt="icon" src="/icons/test.png" className="inline min-w-7 min-h-7" />;
    },
  },
  {
    accessorKey: "name",
    header: "Аты",
  },
  // {
  //   accessorKey: "description",
  //   header: "Сипаттамасы",
  // },
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
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
  // {
  //   header: "Өңделген күні",
  //   accessorKey: "editedAt",
  //   cell: ({ row }) => {
  //     const date = row.original.editedAt;
  //     return <Moment locale="kk" date={date} fromNow />;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Link href={`/home/my-exams/exam/${id}`}>
          <Button size={"sm"}>
            <ExternalLink size={16} className="mr-2" />
            Ашу
          </Button>
        </Link>
      );
    },
  },
];
