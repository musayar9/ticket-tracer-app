"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { fetchTrain, searchTrain } from "@/utils/api";
import { FromStationList, Station } from "@/utils/types";
import { formatCustomDate } from "@/utils/functions";

const FormArea = () => {
  const [stations, setStations] = useState<Station[] | null>([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [isFromStation, setIsFromStation] = useState(true);
  const [toStations, setToStations] = useState<FromStationList[] | undefined>(
    []
  );
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrain();
      setStations(data);
    };
    fetchData();
  }, []);

  const handleFromStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedStation = stations?.find(
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

  const fromStationData: FromStationList[] | undefined = stations?.map(
    (station) => ({
      stationID: station.stationID,
      stationName: station.stationName,
      stationViewName: station.stationViewName,
    })
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  return (
    <div className="py-4 space-y-3">
      <h3 className="text-slate-600 text-center text-2xl font-semibold">
        Tren <span className="text-slate-700">Bileti</span> Sorgulama
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-4">
          <FormSelect
            item={fromStationData}
            onChange={handleFromStationChange}
            label={"Gidiş Yeri"}
            selectedValue={"Gidiş Yerini Seçin"}
            value={fromStation}
          />
          <FormSelect
            item={toStations}
            label="Varış Yeri"
            selectedValue="Varış Yerini Seçin"
            onChange={handleToStationChange}
            value={toStation}
            checkFromStation={isFromStation}
          />
        </div>
        <FormInput
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          minDate={new Date()}
          label={"Gidiş Tarihi"}
        />

        <button
          type="submit"
          className="w-full px-4 py-2 border border-blue-500 rounded-lg mt-4  font-semibold hover:bg-blue-600  hover:text-white transition  duration-200 ease-linear "
        >
          Sorgula
        </button>
      </form>
    </div>
  );
};

export default FormArea;
