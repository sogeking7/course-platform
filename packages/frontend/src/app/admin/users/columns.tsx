"use client"

import { User } from "@/types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<User>[] = [
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
    accessorKey: "role",
    header: "Роль",
    cell: ({ getValue }) => {
      const role = getValue<string>();
      return role === "USER" ? "Оқушы" : "Админ"
    }
  },
]
