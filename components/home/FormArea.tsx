"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { searchTrain } from "@/utils/api";
import { FromStationList, Station } from "@/utils/types";
import { formatCustomDate } from "@/utils/functions";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";
import { FaCircleArrowRight, FaTrain } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";

type FormAreaProps = {
  data: Station[];
};



const FormArea: React.FC<FormAreaProps> = ({ data }) => {
  console.log("dats", data);
  const { setLoading, loading, setSearchTicket } = useGlobalContext();
  const router = useRouter();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [isFromStation, setIsFromStation] = useState(true);
  const [toStations, setToStations] = useState<FromStationList[] | undefined>(
    []
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [buyTickets, setBuyTickets] = useState(true);

  const handleFromStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedStation = data?.find(
      (station) => station.stationName === value
    );
    setFromStation(value);
    const toStationList = selectedStation?.toStationList.map((item) => {
      return {
        stationID: item.toStationId,
        stationName: item.toStationName,
      };
    });
    console.log(toStationList, "toStationList");
    setToStations(selectedStation ? toStationList : []);
    setIsFromStation(false);
    setToStation("");
  };

  const handleToStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setToStation(value);
  };

  const fromStationData: FromStationList[] | undefined = data?.map(
    (station) => ({
      stationID: station.stationID,
      stationName: station.stationName,
      stationViewName: station.stationViewName,
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
      gidisTarih: formattedDate,
      binisIstasyonId: selectedFromStation?.stationID || 0,
      inisIstasyonId: selectedToStation?.stationID || 0,
      binisIstasyon: selectedFromStation?.stationName || "",
      inisIstasyonu: selectedToStation?.stationName || "",
    };

    const data = await searchTrain(requestBody);
    console.log(data, "data");
    setSearchTicket(data);
    // addTicketToLocalStorage(data)
    localStorage.setItem("ticket", JSON.stringify(data));
    router.push("/search-ticket");
    // router.replace("/search-ticket");
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  useEffect(() => {
    if (error && errorMessage) {
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
    }
  }, [error, errorMessage]);

  return (
    <div className=" space-y-2">
      <div className="flex items-center justify-between   border-b border-slate-300 pb-1 ">
        <div
          className={`${
            buyTickets && "border-b-2 border-red-600  "
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
            !buyTickets && "border-b-2 border-red-600  "
          }  flex items-center justify-center w-full -mb-2 cursor-pointer`}
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
          <form onSubmit={handleSubmit} className="-mt-4">
            <div className="flex  flex-col md:flex-row  items-center justify-center gap-4">
              <FormSelect
                item={fromStationData}
                onChange={handleFromStationChange}
                label={"Gidiş Yeri"}
                selectedValue={"Gidiş Yerini Seçin"}
                value={fromStation}
                error={error}
              />
              <FormSelect
                item={toStations}
                label="Varış Yeri"
                selectedValue="Varış Yerini Seçin"
                onChange={handleToStationChange}
                value={toStation}
                checkFromStation={isFromStation}
                error={error}
              />
            </div>
            <div className="flex  flex-col  items-center justify-center gap-4 mt-4 md:mt-0">
              <FormInput
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                minDate={new Date()}
                label={"Gidiş Tarihi"}
                error={error}
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
        <>
          <p>Biletlerim</p>
        </>
      )}
    </div>
  );
};

export default FormArea;
