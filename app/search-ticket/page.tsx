"use client"
import { useGlobalContext } from '@/context/ticket-tracer-context'
import React from 'react'
import { FaTrain } from "react-icons/fa";
const SearchTicket = () => {
const {searchTicket} = useGlobalContext();
console.log(searchTicket,"searchTicket")



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
            <FaTrain className="text-blue-500" />
            <span className="font-semibold">{searchTicket.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchTicket