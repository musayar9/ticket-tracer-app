import React from "react";
import { FaTrainSubway } from "react-icons/fa6";

const MyTickets = () => {
  return (
    <div className="p-4 rounded-2xl shadow-xl bg-[#fff] my-8">
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4   md:grid md:grid-cols-8  p-4 border-b-2 border-slate-400 border-dotted tickets ">
        <div className="flex  items-center   md:col-span-2  gap-2">
          <span className="bg-blue-500 rounded-full  w-10 h-10 md:w-8 md:h-8  flex items-center justify-center">
            <FaTrainSubway className="text-white" size={18} />
          </span>
          <p className="hidden  md:flex font-semibold text-slate-600 tracking-wider text-sm">
            Ticket <span className="text-slate-700">Tracer</span>
          </p>
        </div>

        <div className="flex flex-col items-center  md:col-span-4 ">
          <div className="flex flew-wrap text-[12px] font-semibold text-slate-500 ">
            <p className="truncate">İstanbul(Söğütlüçeşme) </p>-
            <p className="truncate"> ERYAMAN</p>
          </div>
          <p className="flex  text-[12px] font-semibold text-slate-500 truncate">
            <span>Perşembe - </span> <span> 10:00</span>
          </p>
        </div>

        <p className="self-end md:self-auto  md:col-span-2 text-end text-[14px] md:text-[17px] font-semibold text-slate-600">
          04-12-2024
        </p>
      </div>

      <div className="flex flex-col  items-center justify-start gap-3 sm:gap-4   md:grid md:grid-cols-8 p-4 border-b-2 border-slate-400 ">
        <p className="md:col-span-2 text-slate-700 text-sm font-semibold">
          musasayar67@gmail.com
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8 md:col-span-4">
          <p className="flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500">
              TRN CODE
            </span>
            <span className="text-xs text-slate-600">81030</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500">Kalkış</span>
            <span className="text-xs text-slate-600">10:00</span>
          </p>
          <p className="flex flex-col items-center">
            <span className="text-xs font-semibold text-slate-500">Varış</span>
            <span className="text-xs text-slate-600">13:00</span>
          </p>
        </div>

        <p className="self-end md:self-auto md:col-span-2 text-end text-[14px] text-red-600 font-[600]">
          Pending
        </p>
      </div>

      <div className="flex items-center justify-between p-4">
        <p className="text-[14px] text-slate-700 font-semibold ">
          Toplam Tutar:
        </p>
        <p className="text-[14px] md:text-[17px] text-slate-700 font-semibold ">
          TRY 540.00
        </p>
      </div>
    </div>
  );
};

export default MyTickets;