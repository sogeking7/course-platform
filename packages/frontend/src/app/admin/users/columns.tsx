"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Аты-жөні",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return (
        <span>
          <img src="/graduation-hat.png" className="inline mr-4" width={24} height={24} />
          {lastName} {firstName}
        </span>
      );
    },
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
];
