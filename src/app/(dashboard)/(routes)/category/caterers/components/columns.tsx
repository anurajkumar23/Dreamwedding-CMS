"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CatererColumn = {
  id: string;
  name: string;
  price: number;
  vegMenu: {
    starter: string;
    maincourse: string;
    desert: string;
    welcomedrink: string;
    breads: string;
    rice: string;
  };
  nonVegMenu: {
    starter: string;
    maincourse: string;
    desert: string;
    welcomedrink: string;
    breads: string;
    rice: string;
  };
  addons: {
    starter: string;
    maincourse: string;
    desert: string;
    welcomedrink: string;
    breads: string;
    rice: string;
  };
};

export const columns: ColumnDef<CatererColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "vegMenu",
    header: "Veg Menu",
    cell: ({ row }) => {
      const { starter, maincourse, desert, welcomedrink, breads, rice } = row.original.vegMenu;
      return (
        <div>
          <p><strong>Starter:</strong> {starter}</p>
          <p><strong>Main Course:</strong> {maincourse}</p>
          <p><strong>Desert:</strong> {desert}</p>
          <p><strong>Welcome Drink:</strong> {welcomedrink}</p>
          <p><strong>Breads:</strong> {breads}</p>
          <p><strong>Rice:</strong> {rice}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "nonVegMenu",
    header: "Non-Veg Menu",
    cell: ({ row }) => {
      const { starter, maincourse, desert, welcomedrink, breads, rice } = row.original.nonVegMenu;
      return (
        <div>
          <p><strong>Starter:</strong> {starter}</p>
          <p><strong>Main Course:</strong> {maincourse}</p>
          <p><strong>Desert:</strong> {desert}</p>
          <p><strong>Welcome Drink:</strong> {welcomedrink}</p>
          <p><strong>Breads:</strong> {breads}</p>
          <p><strong>Rice:</strong> {rice}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "addons",
    header: "Addons",
    cell: ({ row }) => {
      const { starter, maincourse, desert, welcomedrink, breads, rice } = row.original.addons;
      return (
        <div>
          <p><strong>Starter:</strong> {starter}</p>
          <p><strong>Main Course:</strong> {maincourse}</p>
          <p><strong>Desert:</strong> {desert}</p>
          <p><strong>Welcome Drink:</strong> {welcomedrink}</p>
          <p><strong>Breads:</strong> {breads}</p>
          <p><strong>Rice:</strong> {rice}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
