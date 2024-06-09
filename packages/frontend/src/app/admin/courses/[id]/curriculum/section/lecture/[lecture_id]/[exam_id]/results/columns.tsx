"use client";

import { ExamResult } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UseMutateFunction } from "@tanstack/react-query";

export const columns = (
  mutate: UseMutateFunction<any, Error, { email: string }, unknown>,
  examId: number,
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

      const handleDeleteResult = (email: string) => {
        mutate({ email });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"} className="w-full">
                    <Trash size={16} className="mr-2" /> Өшіру
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center">
                      <Trash
                        size={18}
                        className="inline-block mr-2 text-destructive"
                      />
                      Result: {data?.firstName!}
                      {/* Сіз мүлдем сенімдісіз бе? */}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Бұл әрекетті қайтару мүмкін емес. Бұл сіздің есептік
                      жазбаңызды біржола жояды және деректеріңізді біздің
                      серверлерден жояды.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteResult(data.email)}
                    >
                      {/* {mutationDeleteExam.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )} */}
                      Жалғастыру
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
