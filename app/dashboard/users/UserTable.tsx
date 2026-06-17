"use client";

import { useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  onEdit?: (user: TData) => void;
  onDelete?: (user: TData) => void;
}

export function UserTable<
  TData extends {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  },
>({
  columns,
  data,
  onSelectedRowsChange,
  onEdit,
  onDelete,
}: UserTableProps<TData, TData>) {
  const { t } = useLanguage();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    onSelectedRowsChange?.(selectedRows);
  }, [table.getSelectedRowModel().rows, onSelectedRowsChange]);

  const UserCard = ({ user }: { user: TData }) => {
    const isSelected = table
      .getSelectedRowModel()
      .rows.some((row) => row.original.id === user.id);

    return (
      <div
        className={`border rounded-lg p-4 mb-3 ${isSelected ? "bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700" : "bg-white dark:bg-black dark:text-white"}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                const row = table
                  .getRowModel()
                  .rows.find((r) => r.original.id === user.id);
                row?.toggleSelected();
              }}
            />
            <span className="font-semibold text-lg dark:text-white">
              {user.name}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-500"
              onClick={() => onEdit?.(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500"
              onClick={() => onDelete?.(user)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="dark:text-gray-300">
              {t.users?.table?.email || "Email"}:
            </span>
            <span className="text-gray-700 break-all text-right ml-2 dark:text-gray-300">
              {user.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-gray-300">
              {t.users?.table?.role || "Role"}:
            </span>
            <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
              {user.role}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-gray-300">
              {t.users?.table?.status || "Status"}:
            </span>
            <Badge
              className={
                user.status === "Active"
                  ? "bg-black text-white dark:bg-[#27272a] dark:text-white"
                  : "bg-black dark:bg-[#27272a] dark:text-white"
              }
            >
              {user.status}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="dark:text-gray-300">
              {t.users?.table?.joined || "Joined"}:
            </span>
            <span className="dark:text-gray-300">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* نمای دسکتاپ (جدول) */}
      <div className="hidden md:block rounded-lg p-5 dark:bg-black">
        <div className="rounded-md border dark:border-gray-700">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="dark:border-gray-700">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="dark:text-gray-300">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const user = row.original;
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="dark:border-gray-700"
                    >
                      {row.getVisibleCells().map((cell) => {
                        if (cell.column.id === "actions") {
                          return (
                            <TableCell
                              key={cell.id}
                              className="dark:text-gray-300"
                            >
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-blue-500"
                                  onClick={() => onEdit?.(user)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-500"
                                  onClick={() => onDelete?.(user)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={cell.id}
                            className="dark:text-gray-300"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="dark:border-gray-700">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center dark:text-gray-400"
                  >
                    {t.users?.noResults || "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* نمای موبایل (کارت‌ها) */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4 p-2 rounded-lg dark:text-black">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={() => table.toggleAllPageRowsSelected()}
            />
            {t.users?.selectAll || "Select All"} ({data.length})
          </label>
        </div>

        <div className="space-y-3">
          {data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {t.users?.noResults || "No results."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
