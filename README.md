## Form Area

```tsx
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

type FormAreaProps = {
  data: Station[];
};

const FormArea: React.FC<FormAreaProps> = ({ data }) => {
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
    <div className="py-4 space-y-3">
      <h3 className="text-slate-600 text-center text-2xl font-semibold">
        Tren <span className="text-slate-700">Bileti</span> Sorgulama
      </h3>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default FormArea;
```
 v23 tccdd query servisinde ekranda kullnaıcı 14 seçtiyse gönderilecek tarih 13 aralık  ,
 erkek için m kadın için g