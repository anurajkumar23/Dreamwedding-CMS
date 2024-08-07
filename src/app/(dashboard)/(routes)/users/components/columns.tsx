"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type UserColumn = {
  id: string
  name: string
  phone:     String
  email:     String
  address:   String
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone no",
  },
  {
    accessorKey: "email",
    header: "Email id",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
