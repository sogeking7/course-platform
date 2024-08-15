"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { User } from "@/types";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { addMissingKeys } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // selectedUsersObject: RowSelectionState;
  inviteUserToExam: UseMutationResult<
    any,
    Error,
    {
      emails: {
        email: string;
      }[];
    },
    unknown
  >;
  deleteUserFromExam: UseMutationResult<
    any,
    Error,
    {
      emails: {
        email: string;
      }[];
    },
    unknown
  >;
  initialRow: any;
}

export const AdminExamsUserInviteDataTable = <TData, TValue>({
  columns,
  data,
  initialRow,
  inviteUserToExam,
  deleteUserFromExam,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectionChanged, setSelectionChanged] = useState(false);

  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(initialRow);

  useEffect(() => {
    setRowSelection(addMissingKeys(initialRow, data.length));
  }, [initialRow, data.length]);

  useEffect(() => {
    console.log("dhello", rowSelection);
    console.log(JSON.stringify(addMissingKeys(rowSelection, data.length)));
    console.log(JSON.stringify(addMissingKeys(initialRow, data.length)));
    setSelectionChanged(
      JSON.stringify(addMissingKeys(rowSelection, data.length)) !==
        JSON.stringify(addMissingKeys(initialRow, data.length)),
    );
  }, [rowSelection, initialRow]);

  // useEffect(() => {
  //   if (selectionChanged) {
  //     handleChangeButtonClick();
  //   }
  // }, [selectionChanged]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
    initialState: {
      rowSelection: initialRow,
    },
  });

  const handleChangeButtonClick = async () => {
    const selectedEmails = [];
    const unselectedEmails = [];
    console.log(rowSelection);

    for (let i = 0; i < data.length; i++) {
      if (rowSelection[i]) {
        selectedEmails.push({
          email: (data as User[])[i].email,
        });
      } else {
        unselectedEmails.push({
          email: (data as User[])[i].email,
        });
      }
    }

    if (selectedEmails.length > 0) {
      inviteUserToExam.mutate({ emails: selectedEmails });
    }

    if (unselectedEmails.length > 0) {
      deleteUserFromExam.mutate({ emails: unselectedEmails });
    }
    // console.log(rowSelection);
    console.log("Selected emails:", selectedEmails);
    console.log("Unselected emails:", unselectedEmails);
  };

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Аты"
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-sm:max-w-40 sm:max-w-sm"
        />
        <div>
          <span className="text-neutral-500">Барлығы:</span>{" "}
          <b>{table.getFilteredRowModel().rows.length}</b>
        </div>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <>
                      {["actions", "icon"].includes(
                        header.column.columnDef.id!,
                      ) ? (
                        <TableHead
                          key={header.id}
                          className="w-[0px]"
                        ></TableHead>
                      ) : (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )}
                    </>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Бос
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectionChanged && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleChangeButtonClick}>
            {(deleteUserFromExam.isPending || inviteUserToExam.isPending) && (
              <Loader className="mr-2" size={14} />
            )}
            Сақтау
          </Button>
        </div>
      )}
    </div>
  );
};
