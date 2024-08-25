"use client"
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import StatusCell from "./StatusCell";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";

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
    header: ({ column }) =>{
      return (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({ row }) => (
      <StatusCell
        initialStatus={row.original.status}
        sellerId={row.original.id}
      />
    ),
  },
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
