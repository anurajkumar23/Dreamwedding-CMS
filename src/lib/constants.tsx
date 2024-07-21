// /lib/constants.tsx

import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  UsersRound,
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
        icon: <SprayCan /> ,
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
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/users",
    icon: <UsersRound />,
    label: "Users",
  },
];
