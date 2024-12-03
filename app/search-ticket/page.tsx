"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import {
  formateHour,
  formattedDate,
  formattedHoursMinutes,
} from "@/utils/functions";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

import { FaArrowRight, FaXmark } from "react-icons/fa6";
import { TbDisabled } from "react-icons/tb";
import { LuArmchair } from "react-icons/lu";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { SearchTicketType } from "@/utils/types";
import { BsFillPatchMinusFill, BsPatchPlusFill } from "react-icons/bs";

import customFetch from "@/utils/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SearchTicket = () => {
  const { searchTicket, email, setEmail } = useGlobalContext();
  const [selectedTrains, setSelectedTrains] = useState<SearchTicketType[]>([]);
  const [emailError, setEmailError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const router = useRouter();
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
  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Geçerli bir email adresi girin.");

      return false;
    }
    setEmailError("");
    return true;
  };
  useEffect(() => {
    if (emailError) {
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    }
  }, [emailError]);

  const handleAddedTicket = async () => {
    if (handleEmailValidation()) {
      const selectedTickets = selectedTrains.map((train) => ({
        trainID: train.trainID,
        tourID: train.tourID,
        gidisTarih: train.departureDate,
        inisTarih: train.arrivalDate,
        binisIstasyon: train.departureStation,
        inisIstasyonu: train.arrivalStation,
        email,
        binisIstasyonId: train.departureStationID,
        inisIstasyonId: train.arrivalStationID,
      }));

      try {
        const res = await customFetch.post("/tcdd/add", {
          request: selectedTickets,
        });
        console.log(res, "res");
        setShowSuccessMsg(true);
      } catch (error) {
        console.log(error);
        console.log("ekleme sırasında bir hata oluştu");
      }
    }
  };

  if (!searchTicket || searchTicket.length === 0) {
    return <p>No tickets found.</p>;
  }
  console.log(selectedTrains, "selectedTreains");
  return (
    <div className="max-w-[1200px] w-full mx-auto p-2 md:p-8 ">
      <div className=" p-8 ">
        <div className="px-4 flex items-center justify-center ">
          <div className="text-sm md:text-xl lg:text-3xl flex flex-wrap items-center justify-center font-semibold gap-3">
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
                } flex flex-wrap md:flex-nowrap items-start gap-2  shadow-xl rounded-3xl p-4 relative`}
              >
                <div className="md:self-center  p-4 pl-10 md:p-2  ">
                  {/* Departure Station */}
                  <Image
                    width={100}
                    height={100}
                    src="/images/train.svg"
                    className="w-32 h-auto md:w-28 lg:w-20 p-2 "
                    alt="logo"
                  />
                </div>

                <div className=" seferDepartureArrival flex items-start justify-center w-full flex-col md:pl-6 md:pr-6 md:border-l-2 md:border-r-2  md:border-slate-500 md:border-dotted">
                  <p className="text-[12px] md:text-[14px] lg:text-[17px]">
                    {" "}
                    <span className="text-[#444763] font-semibold">
                      YHT:
                    </span>{" "}
                    <span className="text-[#444763] ">{item.trainName}</span>
                  </p>

                  <div className=" grid grid-cols-8 w-full text-[#8392a7] text-[11px] md:text-[14px]  font-semibold mt-4 mr-0 ml-0">
                    <span className="col-span-2 truncate">
                      {item.departureStation}
                    </span>
                    <span className="text-center col-span-4">
                      {formattedHoursMinutes({
                        departuresDate: item?.departureDate,
                        arrivalsDate: item?.arrivalDate,
                      })}
                    </span>
                    <span className="col-span-2 text-end truncate">
                      {item.arrivalStation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full ">
                    <span className="text-[#444763] font-bold text-[14px] md:text-[24px]">
                      {formateHour(item.departureDate)}
                    </span>
                    <span className=" horizontalHR max-w-full w-[100%]"></span>

                    <span className="text-[#444763] font-bold text-[14px] md:text-[24px]">
                      {formateHour(item.arrivalDate)}
                    </span>
                  </div>
                  <div className="grid grid-cols-8 w-full mr-0 ml-0">
                    <span className="text-[#8392a7] font-bold text-[11px] md:text-[14px]  col-span-2">
                      {formattedDate(item.departureDate)}
                    </span>
                    <span className="text-[#8392a7] font-bold text-[11px] md:text-[14px] col-span-4 text-center">
                      Direkt
                    </span>
                    <span className="text-[#8392a7] font-bold text-[11px] md:text-[14px]  col-span-2 text-end">
                      {formattedDate(item.arrivalDate)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 mt-3 md:mt-0 md:p-4 flex-col ">
                  <h6 className="text-[#8392a7]  text-[11px] md:text-[14px] font-semibold ">
                    Bilet ücreti
                  </h6>
                  <p className="text-[#444763] text-14px md:text-[20px] font-bold">
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
                  }  bottom-0 absolute right-0 rounded-br-3xl rounded-tl-3xl px-4 py-1 text-xs md:text-sm text-[#fff] group flex items-center justify-center`}
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
        <>
          {selectedTrains.length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-5 right-2 border border-slate-300 hover:border-slate-50 hover:bg-emerald-500 font-semibold px-4 py-2 rounded-xl text-[#444763] hover:text-[#fff] text-xs
    transition    duration-200 ease-in 
        
        "
            >
              Seçimi Tamamla
            </button>
          )}
        </>
        {showModal && (
          <div className=" fixed  z-50 inset-0 bg-black bg-opacity-75 flex justify-center items-center w-full ">
            <div className=" absolute top-20 p-4 w-full max-w-xl max-h-full ">
              <div className="relative bg-[#ffffff] p-6 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="self-end"
                  >
                    <FaXmark
                      size={20}
                      className="text-red-600 hover:opacity-85 duration-200 ease-in"
                    />
                  </button>
                </div>
                {
                  <>
                    {showSuccessMsg ? (
                      // Success Message Content
                      <div className="flex flex-col items-center justify-center p-6 gap-4">
                        <h3 className="font-semibold text-emerald-600 text-3xl">
                          Talebiniz başarı ile alındı
                        </h3>
                        <p className="text-[#444763] text-md text-center">
                          Uygun yer bulunması durumunda mail adresinize
                          bilgilendirme yapılacaktır.
                        </p>
                        <button
                          onClick={() => {
                            setShowModal(false);
                            setShowSuccessMsg(false);
                            router.replace("/");
                          }}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-lg self-end  md:text-xs hover:opacity-85 duration-200 ease-in"
                        >
                          Tamam
                        </button>
                      </div>
                    ) : (
                      // Email Message Content
                      <div>
                        {" "}
                        <div className="flex flex-col items-center justify-center">
                          <h3 className="text-2xl font-semibold text-slate-600">
                            E-Mail
                          </h3>
                          <video
                            src="/video/email2.mp4"
                            className="rounded-full  w-24 h-24  -mt-2 "
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                        <>
                          <div className="relative">
                            <input
                              name="email"
                              value={email}
                              type="text"
                              placeholder="E-mail Adresiniz Girin"
                              className=" peer w-full  flex px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-md border-2 border-emerald-600 appearance-none  
                  focus:ring-0 focus:border-emerald-600 placeholder:capitalize outline-none"
                              onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="flex  absolute text-sm   bg-base-100  capitalize duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              E-mail Addresinizi Girin
                            </label>
                          </div>
                          {emailError && (
                            <p className="alert alert-error rounded-lg px-4 py-2 text-xs text-white my-4">
                              {emailError}
                            </p>
                          )}
                          <div className="modal-action flex  ">
                            <button
                              onClick={handleAddedTicket}
                              className="px-4 py-2 bg-emerald-600 text-white rounded-lg self-end text-xs hover:opacity-85 duration-200 ease-in"
                            >
                              Mail Gönder
                            </button>
                          </div>
                        </>
                      </div>
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTicket;
