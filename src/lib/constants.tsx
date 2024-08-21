// /lib/constants.tsx

import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Users,
  Building,
  SprayCan,
  Utensils,
  Camera,
} from "lucide-react";
import { NavLink } from "./types";

export const navLinks: NavLink[] = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/category",
    icon: <Shapes />,
    label: "Category",
    innerLinks: [
      {
        url: "/category/banquet-halls",
        icon: <Building />,
        label: "Banquet Halls",
      },
      {
        url: "/category/decorators",
        icon: <SprayCan />,
        label: "Decorators",
      },
      {
        url: "/category/caterers",
        icon: <Utensils />,
        label: "Caterers",
      },
      {
        url: "/category/photographers",
        icon: <Camera />,
        label: "Photographers",
      },
    ],
  },
  {
    url: "/sellerRequest",
    icon: <Shapes />,  // Consider changing this icon to distinguish it from "Category"
    label: "Seller Request",
    innerLinks: [
      {
        url: "/sellerRequest/pending",
        icon: <Building />, // Consider using a different icon here
        label: "Pending",
      },
      {
        url: "/sellerRequest/accepted",
        icon: <SprayCan />,
        label: "Accepted",
      },
      {
        url: "/sellerRequest/rejected",
        icon: <Utensils />,
        label: "Rejected",
      },
    ],
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/users",
    icon: <Users />,
    label: "Users",
  },
];
