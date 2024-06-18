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
    header: "Балл",
    cell: ({ getValue }) => {
      const points = getValue<number>();
      return `${points.toFixed(2)}`;
    },
  },
  {
    accessorKey: "grade",
    header: "Баға",
    cell: ({ getValue }) => {
      const grade = getValue<number>();
      return `${grade.toFixed(2)}%`;
    },
  },
];
