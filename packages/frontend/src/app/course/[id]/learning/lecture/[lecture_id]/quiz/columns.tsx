"use client";

import { QuizResult } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<QuizResult>[] = [
  {
    accessorKey: "state",
    header: "Статус",
  },
  {
    accessorKey: "points",
    header: "Points",
		cell: ({getValue}) => {
			const points = getValue<number>();
			return `${points.toFixed(2)}`
		}
  },
  {
    accessorKey: "grade",
    header: "Grade",
		cell: ({getValue}) => {
			const grade = getValue<number>();
			return `${grade.toFixed(2)}%`
		}
  },
  // {
  //   accessorKey: "role",
  //   header: "Роль",
  //   cell: ({ getValue }) => {
  //     const role = getValue<string>();
  //     return role === "USER" ? "Оқушы" : "Админ"
  //   }
  // },
];
