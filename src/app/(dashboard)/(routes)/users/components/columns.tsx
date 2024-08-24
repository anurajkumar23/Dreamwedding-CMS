"use client"

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import StatusCell from "./StatusCell";

export type UserColumn = {
  id: string;
  name: string;
  phone: string;
  role: string;
  email: string;
  address: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone No",
  },
  {
    accessorKey: "email",
    header: "Email ID",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <StatusCell
          role={row.original.role}
          userId={row.original.id}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
