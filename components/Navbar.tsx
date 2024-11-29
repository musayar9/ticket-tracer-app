import Link from "next/link";
import React from "react";
// import Logo from "@/public/images/train.webp";
// import Image from "next/image";
import { IoTicket } from "react-icons/io5";
import { FaTrainSubway } from "react-icons/fa6";
const Navbar = () => {
  return (
    <nav className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          {/* <Image src={Logo} alt="logo" className="w-12 h-12 rounded-full" />
           */}
          <span className="bg-blue-500 rounded-full  w-10 h-10 flex items-center justify-center">
            <FaTrainSubway className="text-white" size={18} />
          </span>
          <p className="font-semibold text-slate-600 tracking-wider">
            Ticket <span className="text-slate-700">Tracer</span> App
          </p>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <IoTicket className="text-blue-500" size={18}/>
            <Link href={"/ticket"} className="text-sm  text-slate-600 font-semibold tracking-wide">Biletlerim</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
