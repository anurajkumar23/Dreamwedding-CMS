"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PhotographerColumn = {
  id: string;
  name: string;
  rating: number;
  location: {
    city: string;
    pincode: string;
    area: string;
  };
  locationUrl: string;
  outerdescription: string;
  innerdescription: string;
  feature: string[];
  price: number[];
  contactUs: number;
  yearOfEstd: number;
  services: string[];
  occasion: string;
  billboard: string;
  gallery: {
    name: string;
    photos: string[];
  }[];
  photos: string[];
};

export const columns: ColumnDef<PhotographerColumn>[] = [
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
    cell: ({ row }) => {
      const { city, pincode, area } = row.original.location;
      return `${city}, ${area}, ${pincode}`;
    },
  },
  {
    accessorKey: "locationUrl",
    header: "Location URL",
  },
  {
    accessorKey: "outerdescription",
    header: "Outer Description",
  },
  {
    accessorKey: "innerdescription",
    header: "Inner Description",
  },
  {
    accessorKey: "feature",
    header: "Features",
    cell: ({ row }) => Array.isArray(row.original.feature) ? row.original.feature.join(", ") : "N/A",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => Array.isArray(row.original.price) ? row.original.price.join(", ") : "N/A",
  },
  {
    accessorKey: "contactUs",
    header: "Contact Us",
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year of Establishment",
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => Array.isArray(row.original.services) ? row.original.services.join(", ") : "N/A",
  },
  {
    accessorKey: "occasion",
    header: "Occasion",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
  },
  {
    accessorKey: "gallery",
    header: "Gallery",
    cell: ({ row }) => Array.isArray(row.original.gallery) ? row.original.gallery.map(g => g.name).join(", ") : "N/A",
  },
  {
    accessorKey: "photos",
    header: "Photos",
    cell: ({ row }) => Array.isArray(row.original.photos) ? row.original.photos.length : 0,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
