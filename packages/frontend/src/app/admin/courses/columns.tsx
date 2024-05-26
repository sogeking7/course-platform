"use client";

import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: "Аты",
  },
  {
    accessorKey: "description",
    header: "Cипаттамасы",
  },
];
