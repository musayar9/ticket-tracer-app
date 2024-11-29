"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { formattedHoursMinutes } from "@/utils/functions";
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
    <div className="max-w-6xl mx-auto p-8 ">
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
              <div className="flex  gap-1 border-r-2 border-dotted border-slate-500 p-6">
                {/* Departure Station */}
                <img src="/images/train.svg" className="w-20 p-2" alt="logo" />
              </div>

              <div className="flex items-start justify-center flex-col ">
                <p>
                  {" "}
                  <span className="text-slate-700 font-semibold">
                    YHT:
                  </span>{" "}
                  <span className="text-slate-600">{item.trainName}</span>
                </p>

                <div className="flex items-center justify-between gap-24">
                  <p>{item.departureStation}</p>
                  <p>
                    {formattedHoursMinutes({
                      departuresDate: item?.departureDate,
                      arrivalsDate: item?.arrivalDate,
                    })}
                  </p>
                  <p>{item.arrivalStation}</p>
                </div>
                <div></div>
                <div></div>
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
