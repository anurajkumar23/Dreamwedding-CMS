"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type DecoratorColumn = {
  id: string;
  name: string;
  innerdescription: string;
  outerdescription: string;
  rating: number;
  location: string;
  price: number[];
  contactUs: number;
  yearOfEstd: number;
  billboard: string;
  photos: string[];
};

export const columns: ColumnDef<DecoratorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "innerdescription",
    header: "Inner-Description",
  },
  {
    accessorKey: "outerdescription",
    header: "Outer-Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year of Establishment",
  },
  {
    accessorKey: "contactUs",
    header: "Contact Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
