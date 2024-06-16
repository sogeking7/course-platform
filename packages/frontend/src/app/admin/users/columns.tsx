"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { UseMutationResult } from "@tanstack/react-query";
import { MyAlert } from "@/components/my-alert";

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
      return <img src={image} className="inline min-w-7 min-h-7" />;
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
    id: "actions",
    cell: ({ row }) => {
      if (!mutation) return null;
      const data = row.original;
      if (data.role === "ADMIN") return null;
      return (
        <MyAlert
          size="icon"
          name={data?.firstName!}
          id={data.id}
          mutation={mutation}
        />
      );
    },
  },
];
