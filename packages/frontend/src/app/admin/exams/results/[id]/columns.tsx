"use client";

import { ExamResult } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MyAlert } from "@/components/my-alert";
import { UseMutationResult } from "@tanstack/react-query";

export const columns = (
  mutation: UseMutationResult<any, Error, string, unknown>,
): ColumnDef<ExamResult>[] => [
  {
    id: "icon",
    header: "#",
    cell: ({ row }) => {
      const data = row.original;
      const image =
        data.role === "ADMIN"
          ? "/icons/profile.png"
          : "/icons/graduation-hat.png";
      return <img src={image} className="inline min-w-7 min-h-7" />;
    },
  },
  {
    accessorKey: "firstName",
    header: "Аты",
  },
  {
    accessorKey: "lastName",
    header: "Тегі",
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
    accessorKey: "points",
    header: "Балл",
    cell: ({ getValue }) => {
      const points = getValue<number>();
      return `${points?.toFixed(2)}`;
    },
  },
  {
    accessorKey: "grade",
    header: "Баға",
    cell: ({ getValue }) => {
      const grade = getValue<number>();
      return `${grade?.toFixed(2)}%`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <MyAlert
          size="icon"
          name={data?.firstName!}
          id={data?.email}
          mutation={mutation}
        />
      );
    },
  },
];
