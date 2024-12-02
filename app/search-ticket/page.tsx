"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import {
  formateHour,
  formattedDate,
  formattedHoursMinutes,
} from "@/utils/functions";
// import Image from "next/image";
import React, { useState } from "react";

import { FaArrowRight } from "react-icons/fa6";
import { TbDisabled } from "react-icons/tb";
import { LuArmchair } from "react-icons/lu";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { SearchTicketType } from "@/utils/types";
import { BsFillPatchMinusFill, BsPatchPlusFill } from "react-icons/bs";

const SearchTicket = () => {
  const { searchTicket } = useGlobalContext();
  const [selectedTrains, setSelectedTrains] = useState<SearchTicketType[]>([]);

  const handleSelectTrain = (train: SearchTicketType) => {
    if (
      selectedTrains.some(
        (selectedTrain) => selectedTrain.trainID === train.trainID
      )
    ) {
      setSelectedTrains(
        selectedTrains.filter(
          (selectedTrain) => selectedTrain.trainID !== train.trainID
        )
      );
    } else {
      if (selectedTrains.length < 3) {
        setSelectedTrains([...selectedTrains, train]);
      } else {
        console.log("en fazla 3 sefer seçebilirsiniz");
        // return
      }
    }
  };

  if (!searchTicket || searchTicket.length === 0) {
    return <p>No tickets found.</p>;
  }
  console.log(selectedTrains, "selectedTreains");
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

        <div className="space-y-10 my-4 p-2 ">
          {searchTicket.map((item) => {
            const isSelected = selectedTrains.some(
              (selectedTrain) => selectedTrain.trainID === item.trainID
            );
            return (
              <div
                key={item.tourID}
                className={`${
                  item?.emptyPlace?.normalPeopleEmptyPlaceCount === 0
                    ? `${isSelected ? "bg-emerald-200" : "bg-[#fff]"}`
                    : "bg-[#edf0f4]"
                } max-w-6xl flex items-start gap-2  shadow-xl rounded-3xl p-4 relative`}
              >
                <div className=" self-center  p-4 ">
                  {/* Departure Station */}
                  <img
                    src="/images/train.svg"
                    className="w-20 p-2 "
                    alt="logo"
                  />
                </div>

                <div className="seferDepartureArrival flex items-start justify-center flex-col pl-8 pr-6 border-l-2 border-r-2  border-slate-500 border-dotted">
                  <p className="text-[17px]">
                    {" "}
                    <span className="text-[#444763] font-semibold">
                      YHT:
                    </span>{" "}
                    <span className="text-[#444763] ">{item.trainName}</span>
                  </p>

                  <div className=" grid grid-cols-8 w-[600px] text-[#8392a7] text-[14px] font-semibold mt-4 mr-0 ml-0">
                    <span className="col-span-2">{item.departureStation}</span>
                    <span className="text-center col-span-4">
                      {formattedHoursMinutes({
                        departuresDate: item?.departureDate,
                        arrivalsDate: item?.arrivalDate,
                      })}
                    </span>
                    <span className="col-span-2 text-end">
                      {item.arrivalStation}
                    </span>
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
                  <div className="grid grid-cols-8 w-[600px] mr-0 ml-0">
                    <span className="text-[#8392a7] font-bold text-[14px] col-span-2">
                      {formattedDate(item.departureDate)}
                    </span>
                    <span className="text-[#8392a7] font-bold text-[14px] col-span-4 text-center">
                      Direkt
                    </span>
                    <span className="text-[#8392a7] font-bold text-[14px] col-span-2 text-end">
                      {formattedDate(item.arrivalDate)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 p-4 flex-col">
                  <h6 className="text-[#8392a7] text-[14px] font-semibold ">
                    Bilet ücreti
                  </h6>
                  <p className="text-[#444763] text-[24px] font-bold">
                    TRY: 540.00
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="flex items-center font-semibold text-xs text-[#8392a7]">
                      <TbDisabled className="" size={18} />
                      <span>({item.emptyPlace.disabledPlaceCount})</span>
                    </p>
                    <p className="flex items-center font-semibold text-xs text-[#8392a7]">
                      <LuArmchair className="" size={18} />
                      <span>({item.emptyPlace.totalEmptyPlaceCount})</span>
                    </p>
                    <p className="flex items-center font-semibold text-xs text-[#8392a7]">
                      <MdAirlineSeatReclineNormal className="" size={18} />
                      <span>
                        ({item.emptyPlace.normalPeopleEmptyPlaceCount})
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectTrain(item)}
                  disabled={item.emptyPlace.normalPeopleEmptyPlaceCount !== 0}
                  className={`${
                    item.emptyPlace.normalPeopleEmptyPlaceCount !== 0
                      ? "disabled:opacity-80 disabled:cursor-not-allowed bg-[#de2619]"
                      : "bg-emerald-500  hover:bg-emerald-600 duration-200 ease-linear"
                  }  bottom-0 absolute right-0 rounded-br-3xl rounded-tl-3xl px-4 py-1 text-sm text-[#fff] group flex items-center justify-center`}
                >
                  <span
                    className={`${
                      item.emptyPlace.normalPeopleEmptyPlaceCount == 0
                        ? "group-hover:translate-x-4 group-hover:opacity-0 duration-300 ease-in pl-3 group-hover:pl-0"
                        : "pl-3 text-center"
                    }`}
                  >
                    {isSelected ? "Seçildi" : "Seçin"}
                  </span>

                  {isSelected ? (
                    <BsFillPatchMinusFill
                      size={18}
                      className={`${
                        item.emptyPlace.normalPeopleEmptyPlaceCount == 0
                          ? "opacity-0 group-hover:-translate-x-4 group-hover:opacity-100 duration-300 ease-in "
                          : "opacity-0 "
                      }`}
                    />
                  ) : (
                    <BsPatchPlusFill
                      size={18}
                      className={`${
                        item.emptyPlace.normalPeopleEmptyPlaceCount == 0
                          ? "opacity-0 group-hover:-translate-x-4 group-hover:opacity-100 duration-300 ease-in "
                          : "opacity-0 "
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchTicket;
