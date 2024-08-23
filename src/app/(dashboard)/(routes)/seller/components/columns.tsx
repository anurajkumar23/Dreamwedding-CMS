"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SellerColumn = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  whatsappNumber: string;
  GSTNO: string;
  bankDetails: string;
  pancard: string;
  status: "Pending" | "Accepted" | "Rejected";
  banquets: string;
  photographers: string;
  decorators: string;
  caterers: string;
  createdAt: string;
};

export const columns: ColumnDef<SellerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "whatsappNumber",
    header: "WhatsApp Number",
  },
  {
    accessorKey: "GSTNO",
    header: "GST Number",
  },
  {
    accessorKey: "bankDetails",
    header: "Bank Details",
  },
  {
    accessorKey: "pancard",
    header: "PAN Card",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "banquets",
  //   header: "Banquets",
  // },
  // {
  //   accessorKey: "photographers",
  //   header: "Photographers",
  // },
  // {
  //   accessorKey: "decorators",
  //   header: "Decorators",
  // },
  // {
  //   accessorKey: "caterers",
  //   header: "Caterers",
  // },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
