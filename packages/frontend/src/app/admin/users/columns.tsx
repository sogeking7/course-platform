"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ExamResult } from "@/types";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
  mutate?: UseMutateFunction<any, Error, { id: number }, unknown>,
): ColumnDef<User>[] => [
  {
    id: "icon",
    header: "#",
    cell: ({ row }) => {
      const data = row.original;
      const image =
        data.role === "ADMIN" ? "/profile.png" : "/graduation-hat.png";
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
      const data = row.original;
      if (!mutate) return null;
      const handleDeleteUser = (id: number) => {
        mutate({ id });
      };

      return (
        <div className="w-full flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild className="w-8">
              <Button
                disabled={data.role === "ADMIN"}
                size={"icon"}
                className="min-w-8 min-h-8"
                variant={"destructive"}
              >
                <Trash size={14} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center">
                  <Trash
                    size={20}
                    className="inline-block mr-2 text-destructive"
                  />
                  Өшіру: {data?.firstName!}
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
                <AlertDialogAction onClick={() => handleDeleteUser(data.id)}>
                  {/* {mutationDeleteExam.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )} */}
                  Жалғастыру
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
