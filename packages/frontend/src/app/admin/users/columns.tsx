"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { UseMutationResult } from "@tanstack/react-query";
import { MyAlert } from "@/components/my-alert";
import Moment from "react-moment";
import "moment/locale/kk";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";

export const columns = (
  mutation?: UseMutationResult<any, Error, number, unknown>,
): ColumnDef<User>[] => [
  {
    id: "icon",
    header: "#",
    cell: ({ row }) => {
      const data = row.original;
      const image =
      data.role === "ADMIN"
      ? "/icons/profile.png"
      : "/icons/graduation-hat.png";
      return <Image alt="icon" src={image} className="inline min-w-7 min-h-7" />;
    },
  },
  {
    accessorKey: "firstName",
    header: "Аты",
  },
  {
    accessorKey: "lastName",
    header: "Жөні",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Почта",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ getValue }) => {
      const role = getValue<string>();
      return role === "USER" ? "Оқушы" : "Админ";
    },
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
        <Button
          size={"icon"}
          variant={"outline"}
          className="!min-h-8 !min-w-8 p-0"
          asChild
        >
          <Link href={`/admin/users/${course.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     if (!mutation) return null;
  //     const data = row.original;
  //     if (data.role === "ADMIN") return null;
  //     return (
  //       <MyAlert
  //         size="icon"
  //         name={data?.firstName!}
  //         id={data.id}
  //         mutation={mutation}
  //       />
  //     );
  //   },
  // },
];
