"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { formateHour, formattedDate, getFormatDay } from "@/utils/functions";
import React from "react";
import { FaTrainSubway } from "react-icons/fa6";

const MyTickets = () => {
  const { selectedTrainTickets } = useGlobalContext();

  return (
    <div className="  my-8 space-y-4">
      {selectedTrainTickets?.map((train) => (
        <div key={train.id} className="rounded-2xl shadow-xl bg-[#fff] p-4">
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
                <p className="truncate">{train.departure_station} </p>-
                <p className="truncate"> {train.arrival_station}</p>
              </div>
              <p className="flex  text-[12px] font-semibold text-slate-500 truncate">
                <span>{getFormatDay(train.departure_date)} - </span>{" "}
                <span>{formateHour(train.departure_date)}</span>
              </p>
            </div>

            <p className="self-end md:self-auto  md:col-span-2 text-end text-[14px] md:text-[17px] font-semibold text-slate-600">
              {formattedDate(train.departure_date)}
            </p>
          </div>

          <div className="flex flex-col  items-center justify-start gap-3 sm:gap-4   md:grid md:grid-cols-8 p-4 border-b-2 border-slate-400 ">
            <p className="md:col-span-2 text-slate-700 text-sm font-semibold">
              {train.email}
            </p>

            <div className="flex items-center justify-center gap-4 md:gap-8 md:col-span-4">
              <p className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-500">
                  Toplam Deneme
                </span>
                <span className="text-xs text-slate-600">
                  {train.total_attempt}
                </span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-500">
                  Kalkış
                </span>
                <span className="text-xs text-slate-600">
                  {formateHour(train.departure_date)}
                </span>
              </p>
              <p className="flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-500">
                  Varış
                </span>
                <span className="text-xs text-slate-600">
                  {formateHour(train.arrival_date)}
                </span>
              </p>
            </div>

            <p className="self-end md:self-auto md:col-span-2 text-end text-[14px]  font-[600]">
              {train.status === "FOUND" ? (
                <span className="text-emerald-600">Bulundu</span>
              ) : (
                <span className="text-red-600">Bekleniyor</span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-between p-4">
            <p className="text-[14px] text-slate-700 font-semibold ">
              Cinsiyet
            </p>
            <p className="text-[14px] md:text-[17px] text-slate-700 font-semibold ">
              {train.gender === "M" ?  "Erkek" : "Kadın"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
