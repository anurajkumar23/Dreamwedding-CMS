"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";


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
    cell: ({ row }) => {
      const status = row.original.status;
      let statusColor;
      let StatusIcon;
  
      switch (status) {
        case "Pending":
          statusColor = "text-yellow-500";
          StatusIcon = Hourglass;
          break;
        case "Accepted":
          statusColor = "text-green-500";
          StatusIcon = CheckCircle;
          break;
        case "Rejected":
          statusColor = "text-red-500";
          StatusIcon = XCircle;
          break;
        default:
          statusColor = "text-gray-500";
          StatusIcon = Hourglass;
      }
  
      return (
        <span className={`flex items-center gap-2 ${statusColor}`}>
          <StatusIcon className="w-5 h-5" />
          {status}
        </span>
      );
    },
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
