"use client";

import { ExamResult } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MyAlert } from "@/components/my-alert";
import { UseMutationResult } from "@tanstack/react-query";

export const columns = (
  mutation: UseMutationResult<any, Error, string, unknown>,
): ColumnDef<ExamResult>[] => [
  {
    accessorKey: "firstName",
    header: "Аты",
  },
  {
    accessorKey: "lastName",
    header: "Тегі",
  },
  {
    accessorKey: "email",
    header: "Почта",
  },
  {
    accessorKey: "examResult",
    header: "Балл",
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
