"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import {
  formateHour,
  formattedDate,
  formattedHoursMinutes,
} from "@/utils/functions";
import Image from "next/image";
import React from "react";
import { FaTrain } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
const SearchTicket = () => {
  const { searchTicket } = useGlobalContext();
  console.log(searchTicket, "searchTicket");

  if (!searchTicket || searchTicket.length === 0) {
    return <p>No tickets found.</p>;
  }
  return (
    <div className="max-w-7xl mx-auto p-8 ">
      <div className="rounded-lg p-8">
        <div className="px-4 flex items-center justify-center ">
          <div className="text-3xl flex items-center justify-center font-semibold gap-3">
            <p className="text-slate-700">Gidiş - </p>
            <p className="text-slate-600">
              {searchTicket[0]?.departureStation}
            </p>
            <FaArrowRight className="text-slate-600" />
            <p className="text-slate-600">{searchTicket[0]?.arrivalStation}</p>
          </div>
        </div>

        <div className="space-y-4 my-4 p-2 ">
          {searchTicket.map((item) => (
            <div
              key={item.tourID}
              className="max-w-6xl flex items-start gap-2  bg-[#ffffff] shadow-xl rounded-3xl p-4"
            >
              <div className="flex   p-8 ">
                {/* Departure Station */}
                <img src="/images/train.svg" className="w-20 p-2" alt="logo" />
              </div>

              <div className="flex items-start justify-center flex-col pl-8 pr-6 border-l-2 border-r-2  border-slate-500 border-dotted">
                <p className="text-[17px]">
                  {" "}
                  <span className="text-[#444763] font-semibold">
                    YHT:
                  </span>{" "}
                  <span className="text-[#444763] ">{item.trainName}</span>
                </p>

                <div className="flex items-center justify-between w-[600px] text-[#8392a7] text-[14px] font-semibold mt-4">
                  <span>{item.departureStation}</span>
                  <span className="text-center">
                    {formattedHoursMinutes({
                      departuresDate: item?.departureDate,
                      arrivalsDate: item?.arrivalDate,
                    })}
                  </span>
                  <span>{item.arrivalStation}</span>
                </div>
                <div className="flex items-center justify-between w-[600px] ">
                  <span className="text-[#444763] font-bold text-[24px]">
                    {formateHour(item.departureDate)}
                  </span>
                  <span className="horizontalHR"></span>
                  <span className="text-[#444763] font-bold text-[24px]">
                    {formateHour(item.arrivalDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between w-[600px] ">
                  {" "}
                  <span className="text-[#8392a7] font-bold text-[14px]">
                    {formattedDate(item.departureDate)}
                  </span>
                  <span className="text-[#8392a7] font-bold text-[14px] pr-24">
                    Direkt
                  </span>
                  <span className="text-[#8392a7] font-bold text-[14px]">
                    {formattedDate(item.arrivalDate)}
                  </span>
                </div>
              </div>
              <div className="flex gap-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTicket;
