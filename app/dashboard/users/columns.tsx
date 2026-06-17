"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "./UserActions";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export const getColumns = (t: any): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t.users?.selectAll || "Select all"}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t.users?.selectRow || "Select row"}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {t.users?.table?.name || "Name"}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: t.users?.table?.email || "Email",
  },
  {
    accessorKey: "role",
    header: t.users?.table?.role || "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const displayRole =
        role === "Admin" ? t.roles?.admin || "Admin" : t.roles?.user || "User";
      return (
        <Badge variant={role === "Admin" ? "default" : "secondary"}>
          {displayRole}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: t.users?.table?.status || "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const displayStatus =
        status === "Active"
          ? t.status?.active || "Active"
          : t.status?.inactive || "Inactive";
      return (
        <Badge
          className={
            status === "Active"
              ? "bg-black dark:bg-[#27272a] dark:text-white"
              : "bg-black dark:bg-[#27272a] dark:text-white"
          }
        >
          {displayStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: t.users?.table?.joined || "Joined",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: t.users?.table?.actions || "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions user={user} />;
    },
  },
];
