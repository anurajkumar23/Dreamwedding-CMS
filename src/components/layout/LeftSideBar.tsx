"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../public/Dream Wedding Logo_20240417_103338_0000.png";

import { navLinks } from "@/lib/constants";
import { NavLink } from "@/lib/types";

const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    setCategoryOpen(!categoryOpen);
  };

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src={logo} alt="logo" width={200} height={70} priority={false} loading="lazy"/>

      <div className="flex flex-col gap-12">
        {navLinks.map((link: NavLink) => (
          <div key={link.label}>
            {link.label === "Category" ? (
              <>
                <a
                  href={link.url}
                  onClick={handleCategoryClick}
                  className={`flex gap-4 text-body-medium ${
                    categoryOpen ? "text-red-600" : "text-grey-1"
                  }`}
                >
                  {link.icon} <p>{link.label}</p>
                </a>
                {categoryOpen && (
                  <div className="flex flex-col pl-8 gap-4 mt-2">
                    {link.innerLinks?.map((innerLink) => (
                      <Link
                        href={innerLink.url}
                        key={innerLink.label}
                        className={`flex gap-4 text-body-medium ${
                          pathname === innerLink.url ? "text-red-600" : "text-grey-1"
                        }`}
                      >
                        {innerLink.icon} <p>{innerLink.label}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.url}
                className={`flex gap-4 text-body-medium ${
                  pathname === link.url ? "text-red-600" : "text-grey-1"
                }`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
