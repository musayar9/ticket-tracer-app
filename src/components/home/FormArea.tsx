"use client";
import React, { useEffect, useRef, useState } from "react";
import FormInput from "../FormDateInput";
import { searchTrain } from "@/utils/api";
import { FromStationList, Station } from "@/utils/types";
import { formatCustomDate } from "@/utils/functions";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";
import { FaCircleArrowRight, FaTrain } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import SearchMyTickets from "./SearchMyTickets";
import FormInputs from "../FormInputs";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundForward } from "react-icons/io";
import { LuArrowRightToLine } from "react-icons/lu";
import SearchFilterLists from "./SearchFilterLists";

type FormAreaProps = {
  data: Station[];
};

const FormArea: React.FC<FormAreaProps> = ({ data }) => {
  const { setLoading, loading, setSearchTicket } = useGlobalContext();
  const router = useRouter();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [toStations, setToStations] = useState<FromStationList[] | undefined>(
    []
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [buyTickets, setBuyTickets] = useState(true);

  const [departureStations, setDepartureStations] = useState<
    FromStationList[] | undefined
  >([]);
  const [isArrival, setIsArrival] = useState<boolean | null>(null);
  const [departureError, setDepartureError] = useState<string | null>(null);
  const [arrivalError, setArrivalError] = useState<string | null>(null);
  const [isDeparture, setIsDeparture] = useState<boolean | null>(null);
  const [openDepartureDropdown, setOpenDepartureDropdown] = useState(false);
  const [openArrivalDropdown, setOpenArrivalDropDown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const departureRef = useRef<HTMLInputElement>(null);
  const arrivalRef = useRef<HTMLInputElement>(null);
  const handleFromStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFromStation(value);
    setDepartureError(null);
  };

  useEffect(() => {
    if (fromStation) {
      const selectedStation = data?.find(
        (station) => station.stationName === fromStation
      );

      const toStationList = selectedStation?.toStationList.map((item) => {
        return {
          stationID: item.toStationId,
          stationName: item.toStationName,
        };
      });

      setToStations(selectedStation ? toStationList : []);
      setToStation("");
    }
  }, [fromStation, setToStations, data]);

  const handleToStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setToStation(value);
    setArrivalError(null);
  };

  const fromStationData: FromStationList[] | undefined = data?.map(
    (station) => ({
      stationID: station.stationID,
      stationName: station.stationName,
      stationViewName: station.stationViewName,
      stationTrainTypes: station.stationTrainTypes,
    })
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const missingFields = [];
    if (!fromStation) missingFields.push("Gidiş Yeri");
    if (!toStation) missingFields.push("Varış Yeri");
    if (!selectedDate) missingFields.push("Gidiş Tarihi");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following fields: ${missingFields.join(", ")}`
      );
      setError(true);

      return;
    }

    setLoading(true);
    const selectedFromStation = fromStationData?.find(
      (station) => station.stationName === fromStation
    );
    const selectedToStation = toStations?.find(
      (station) => station.stationName === toStation
    );

    const formattedDate = formatCustomDate(selectedDate);

    const requestBody = {
      departureDate: formattedDate,
      departureStationID: selectedFromStation?.stationID || 0,
      arrivalStationID: selectedToStation?.stationID || 0,
      departureStation: selectedFromStation?.stationName || "",
      arrivalStation: selectedToStation?.stationName || "",
    };

    const data = await searchTrain(requestBody);

    setSearchTicket(data);

    // router.push("/search-ticket");
    router.replace("/search-ticket");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (error && errorMessage) {
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
  }, [error, errorMessage]);

  useEffect(() => {
    if (fromStation) {
      const result = fromStationData.filter(
        (item) =>
          item?.stationName
            .toLocaleLowerCase("TR")
            .includes(fromStation.toLocaleLowerCase("TR")) ||
          (item?.stationViewName &&
            item.stationViewName
              .toLocaleLowerCase("TR")
              .includes(fromStation.toLocaleLowerCase("TR")))
      );
      setDepartureStations(result);
    }

    if (toStation) {
      const result = toStations?.filter((item) =>
        item.stationName
          .toLocaleLowerCase("TR")
          .includes(toStation.toLocaleLowerCase("TR"))
      );
      setDepartureStations(result);
    }
  }, [fromStation, toStation]);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDepartureDropdown(false);
        setOpenArrivalDropDown(false);

        if (isDeparture) {
          if (
            !fromStation ||
            !fromStationData.some(
              (station) => station.stationName === fromStation
            )
          ) {
            setDepartureError("Tren Kalkış Alanı Gereklidir");
             
            setToStation("");
          }
          setIsDeparture(false);
        
        }

        if (isArrival) {
          if (
            !toStation ||
            !toStations?.some((station) => station.stationName === toStation)
          ) {
            setArrivalError("Tren Varış Alanı Gereklidir");
          }
          setIsArrival(false);
          setOpenDepartureDropdown(false);
        }
      }

      if (
        arrivalRef.current &&
        !arrivalRef.current.contains(event.target as Node)
      ) {
        setOpenDepartureDropdown(false);
      }
      if (
        departureRef.current &&
        !departureRef.current.contains(event.target as Node)
      ) {
        setOpenArrivalDropDown(false);
      }
    };
    if (isDeparture) {
      if (
        !fromStation ||
        !fromStationData.some((station) => station.stationName === fromStation)
      ) {
        setToStation("");
      }
    }
    if (openDepartureDropdown || openArrivalDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [
    openDepartureDropdown,
    openArrivalDropdown,
    fromStation,
    toStation,
    isDeparture,
    isArrival,
    fromStationData,
    toStations,
  ]);
  return (
    <div className="p-2 space-y-2">
      <div className=" flex items-center justify-between relative  border-b border-slate-300 pb-1 ">
        <div
          className={`${
            buyTickets && "border-b-2 border-red-600 buyTicket left-[98px] "
          }  flex items-center justify-center w-full -mb-1 cursor-pointer`}
          onClick={() => setBuyTickets(true)}
        >
          <div className="pb-2 flex items-center flex-col gap-1">
            <FaTrain size={18} className={`${buyTickets && "text-red-600"}`} />
            <p
              className={`${
                buyTickets ? "text-red-600 font-semibold" : "text-slate-600"
              } text-sm `}
            >
              Bilet Al{" "}
            </p>
          </div>
        </div>
        <div className="border-r h-12 pb-4 -mt-3 border-slate-200"></div>
        <div
          className={`${
            !buyTickets && "border-b-2 border-red-600  buyTicket right-[98px]"
          }  flex items-center justify-center w-full -mb-1 cursor-pointer`}
          onClick={() => setBuyTickets(false)}
        >
          <div className="pb-2 flex items-center flex-col gap-1">
            <GiTicket
              size={18}
              className={`${!buyTickets && "text-red-600"}`}
            />
            <p
              className={`${
                !buyTickets ? "text-red-600 font-semibold" : "text-slate-600"
              } text-sm `}
            >
              Biletlerim
            </p>
          </div>
        </div>
      </div>

      {buyTickets ? (
        <>
          <div className="text-slate-600  flex items-center gap-2 pl-1 pt-3 ">
            <FaCircleArrowRight className="text-[#003aa6]" size={18} />
            <p className="text-[#003aa6] text-[15px] font-[600] ">Tek Yön</p>
          </div>
          <form onSubmit={handleSubmit} className="-mt-2">
            <div className="flex  flex-col md:flex-row  items-center justify-center ps-1 gap-2">
              <FormInputs
                value={fromStation}
                onChange={handleFromStationChange}
                onFocus={() => {
                  setOpenDepartureDropdown(true);
                    setOpenArrivalDropDown(false);
                  setIsDeparture(true);
                }}
                id={"departure_station"}
                label={"Nereden"}
                icon={<GoDotFill />}
                arrowIcon={<IoMdArrowRoundForward className="-ml-1" />}
                message={departureError}
              />

              <FormInputs
                value={toStation}
                onChange={handleToStationChange}
                onFocus={() => {
                  setOpenArrivalDropDown(true);
                   setOpenDepartureDropdown(false);
                  setIsArrival(true);
                }}
                id={"arrival_station"}
                label={"Nereye"}
                icon={<LuArrowRightToLine className="mr-1" />}
                disabled={!fromStation || !!departureError ||  !fromStationData.some(
              (station) => station.stationName === fromStation
            )}
                message={arrivalError}
              />
            </div>

            <>
              {openDepartureDropdown && fromStation && (
                <SearchFilterLists
                  stationData={departureStations}
                  setStation={(stationName) => {
                    setFromStation(stationName);
                    setDepartureError(null);
                  }}
                  dropdown={setOpenDepartureDropdown}
                  openDeparture={openDepartureDropdown}
                  value={fromStation}
                  openArrival={false}
                  isStation={setIsDeparture}
                  styles={"-mt-24 md:-mt-3"}
                />
              )}

              {openArrivalDropdown && toStation && (
                <SearchFilterLists
                  stationData={departureStations}
                  setStation={(stationName) => {
                    setToStation(stationName);
                    setArrivalError(null);
                  }}
                  openArrival={openArrivalDropdown}
                  value={toStation}
                  openDeparture={false}
                  dropdown={setOpenArrivalDropDown}
                  isStation={setIsArrival}
                  styles={"-mt-5 md:-mt-3"}
                />
              )}
            </>

            <div className="flex  flex-col  items-center justify-center gap-2 -mt-4">
              <FormInput
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                minDate={new Date()}
                label={"Gidiş Tarihi"}
                error={error}
                type="date"
                name={"date"}
              />

              <button
                disabled={loading}
                type="submit"
                className="disabled:cursor-not-allowed disabled:opacity-85 w-full px-4 py-2 border rounded-lg mt-4  font-semibold text-[#fff] bg-[#de2619] hover:bg-[#dc3545]
transition  duration-200 ease-linear "
              >
                {loading ? "Yükleniyor" : "Sefer Ara"}
              </button>
            </div>
          </form>
          {errorMessage && error && (
            <div role="alert" className="alert alert-error">
              <IoWarning className="text-yellow-400" />
              <span className="text-white text-xs">{errorMessage}</span>
            </div>
          )}
        </>
      ) : (
        <SearchMyTickets />
      )}
    </div>
  );
};

export default FormArea;
