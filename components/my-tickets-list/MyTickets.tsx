import React from "react";
import { FaTrainSubway } from "react-icons/fa6";

const MyTickets = () => {
  return (
    <div className="p-4 rounded-2xl shadow-xl bg-[#fff] my-8">
      <div className="grid grid-cols-8  p-4 border-b-2 border-slate-400 border-dotted tickets ">
        <div className=" col-span-2 flex items-center  gap-2">
          <span className="bg-blue-500 rounded-full  w-8 h-8 flex items-center justify-center">
            <FaTrainSubway className="text-white" size={18} />
          </span>
          <p className="font-semibold text-slate-600 tracking-wider text-sm">
            Ticket <span className="text-slate-700">Tracer</span>
          </p>
        </div>

        <div className="col-span-4 flex flex-col items-center">
          <p className="flex text-[12px] font-semibold text-slate-500">
            <span>İstanbul(Söğütlüçeşme) - </span> <span> ERYAMAN</span>
          </p>
          <p className="flex text-[12px] font-semibold text-slate-500">
            <span>Perşembe - </span> <span> 10:00</span>
          </p>
        </div>

        <p className="col-span-2 text-end text-14px font-semibold text-slate-600">
          04-12-2024
        </p>
      </div>

      <div className="grid grid-cols-8 p-4 border-b-2 border-slate-400 ">
        <p className="col-span-2 text-slate-700 text-sm font-semibold">
          musasayar67@gmail.com
        </p>

        <div className="flex items-center justify-center gap-8 col-span-4">
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

        <p className="col-span-2 text-end text-[14px] text-red-600 font-[600]">
          Pending
        </p>
      </div>

      <div className="flex items-center justify-between p-4">
        <p className="text-[14px] text-slate-700 font-semibold ">
          Toplam Tutar:
        </p>
        <p className="text-[17px] text-slate-700 font-semibold ">TRY 540.00</p>
      </div>
    </div>
  );
};

export default MyTickets;
