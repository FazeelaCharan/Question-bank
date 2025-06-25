"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import  Question  from "@/lib/types";
import { useQuestions } from "@/Hooks/useQuestions";
import { useDeleteQuestion } from "@/Hooks/useDeleteQuestion";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Loader } from "lucide-react";
import { Badge } from "../ui/badge";

interface Props {
  onEdit: (question: Question) => void;
}

export const QuestionTable = ({ onEdit }: Props) => {
  const { data, isLoading } = useQuestions();
  const deleteQuestion = useDeleteQuestion();

  const columns = useMemo<ColumnDef<Question>[]>(
    () => [
      {
        accessorKey: "question",
        header: "Question",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "options",
        header: "Options",
        cell: (info) =>
          info.row.original.type === "multiple choice" ? (
            <div className="flex flex-wrap gap-1">
              {info.row.original.options?.map((opt, idx) => (
                <Badge key={idx}>{opt}</Badge>
              ))}
            </div>
          ) : (
            "-"
          ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteQuestion.mutate(row.original.id!)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteQuestion, onEdit]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center py-6">No questions available.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6  border">
      <table className="min-w-full text-sm border-solid ">
        <thead className="bg-orange-600">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
