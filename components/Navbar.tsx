"use client";
import Link from "next/link";
import React from "react";

import { FaTrainSubway } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <span className="bg-blue-500 rounded-full  w-10 h-10 flex items-center justify-center">
            <FaTrainSubway className="text-white" size={18} />
          </span>
          <p className="font-semibold text-slate-600 tracking-wider">Biletio</p>
        </Link>
        <div>
          {pathname !== "/" && (
            <div className="flex items-center gap-2">
              <FaHome className="text-blue-500" size={18} />
              <Link
                href={"/"}
                className="text-sm  text-slate-600 font-semibold tracking-wide"
              >
                Ana Sayfa
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
