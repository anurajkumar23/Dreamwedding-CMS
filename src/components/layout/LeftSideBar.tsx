"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "../../../public/Dream Wedding Logo_20240417_103338_0000.png";
import { navLinks } from "@/lib/constants";
import { NavLink } from "@/lib/types";
import { LogOut } from "lucide-react";

const LeftSideBar: React.FC = () => {
  const pathname = usePathname();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sellerRequestOpen, setSellerRequestOpen] = useState(false);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCategoryOpen(!categoryOpen);
  };

  const handleSellerRequestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSellerRequestOpen(!sellerRequestOpen);
  };

  return (
    <div className=" h-full lg:fixed lg:left-0 lg:top-0  p-6 bg-[#E9F5FE] shadow-xl z-20 lg:flex lg:flex-col lg:justify-between lg:gap-16 max-lg:hidden">
      {/* Logo */}
      <div className="flex justify-center lg:justify-start">
      <Image src={logo} alt="logo" width={200} height={70} priority={false} loading="lazy"/>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-8 overflow-auto hide-scrollbar">
        {navLinks.map((link: NavLink) => (
          <div key={link.label}>
            {link.label === "Category" ? (
              <>
                <button
                  onClick={handleCategoryClick}
                  className={`flex justify-between items-center gap-4 py-2 px-4 w-full text-left transition-all duration-300 ${
                    categoryOpen ? "text-red-600 font-semibold" : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    {link.icon} {link.label}
                  </span>
                  <span>{categoryOpen ? "▲" : "▼"}</span>
                </button>
                {categoryOpen && (
                  <div className="flex flex-col pl-8 gap-4 mt-2">
                    {link.innerLinks?.map((innerLink) => (
                      <Link
                        href={innerLink.url}
                        key={innerLink.label}
                        className={`flex gap-4 py-2 pl-2 w-full text-left transition-all duration-300 ${
                          pathname === innerLink.url
                            ? "text-red-600 font-semibold"
                            : "text-gray-600 hover:text-red-600"
                        }`}
                      >
                        {innerLink.icon} {innerLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : link.label === "Seller Request" ? (
              <>
                <button
                  onClick={handleSellerRequestClick}
                  className={`flex justify-between items-center gap-4 py-2 px-4 w-full text-left transition-all duration-300 ${
                    sellerRequestOpen ? "text-red-600 font-semibold" : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    {link.icon} {link.label}
                  </span>
                  <span>{sellerRequestOpen ? "▲" : "▼"}</span>
                </button>
                {sellerRequestOpen && (
                  <div className="flex flex-col pl-8 gap-4 mt-2">
                    {link.innerLinks?.map((innerLink) => (
                      <Link
                        href={innerLink.url}
                        key={innerLink.label}
                        className={`flex gap-4 py-2 pl-2 w-full text-left transition-all duration-300 ${
                          pathname === innerLink.url
                            ? "text-red-600 font-semibold"
                            : "text-gray-600 hover:text-red-600"
                        }`}
                      >
                        {innerLink.icon} {innerLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.url}
                className={`flex items-center gap-4 py-2 px-4 w-full text-left transition-all duration-300 ${
                  pathname === link.url ? "text-red-600 font-semibold" : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {link.icon} {link.label}
              </Link>
            )}
          </div>
        ))}
      <div className="mt-auto flex justify-start items-center gap-4 p-1 text-gray-700 hover:text-red-600 transition-all duration-300 cursor-pointer">
        <LogOut/> <p>Edit Profile</p>
      </div>
      </div>

    
    </div>
  );
};

export default LeftSideBar;
