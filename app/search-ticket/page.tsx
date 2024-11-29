"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { formateHour } from "@/utils/functions";
import React from "react";
import { FaTrain } from "react-icons/fa";
const SearchTicket = () => {
  const { searchTicket } = useGlobalContext();
  console.log(searchTicket, "searchTicket");

  if (!searchTicket || searchTicket.length === 0) {
    return <p>No tickets found.</p>;
  }
  return (
    <div className="max-w-6xl mx-auto p-8 ">
      <div className="bg-white rounded-lg p-8">
        <div className="px-4 flex items-center justify-between border-b border-slate-400 pb-3">
          <p className="text-lg font-semibold text-slate-700">
            <span>
              {searchTicket[0]?.departureStation} -{" "}
              {searchTicket[0]?.arrivalStation}
            </span>
          </p>
          <p className="flex items-center gap-1 text-slate-700">
            <FaTrain className="text-blue-500" size={24} />
            <span className="font-semibold text-xl">{searchTicket.length}</span>
          </p>
        </div>

        <div className="space-y-4 my-4 p-2 ">
          {searchTicket.map((item) => (
            <div
              key={item.tourID}
              className="flex items-center justify-between border border-slate-100 shadow rounded-lg p-4"
            >
              <div className="flex  gap-1">
                {/* Departure Station */}
                <p className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  {/* <FaTrain className="text-white" /> */}
                  <span className="text-white text-md font-semibold">K</span>
                </p>

                <div className="flex flex-col -space-y-1 gap-1">
                  <p className="text-slate-600 text-sm">Kalkış İstasyonu</p>
                  <p className="text-sm text-slate-700 font-semibold">
                    {item.departureStation}
                  </p>
                  <p className="text-blue-700 text-sm font-bold">
                    {formateHour(item.departureDate)}
                  </p>
                </div>
              </div>
              <div>{/* Departure and Arrival time */}</div>
              <div className="flex gap-1">
                <p className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  {/* <FaTrain className="text-white" /> */}
                  <span className="text-white text-md font-semibold">V</span>
                </p>
                <div className="flex items-start justify-center flex-col -space-y-1 gap-1">
                  <p className="text-slate-600 text-sm">Varış İstasyoun</p>
                  <p className="text-sm text-slate-700 font-semibold">
                    {item.arrivalStation}
                  </p>
                  <p className="text-blue-700 text-sm font-bold">
                    {formateHour(item.arrivalDate)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTicket;
