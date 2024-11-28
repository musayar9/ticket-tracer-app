"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { fetchTrain } from "@/utils/api";
import { FromStationList, Station } from "@/utils/types";

const FormArea = () => {
  const [stations, setStations] = useState<Station[] | null>([]);

  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [toStations, setToStations] = useState<FromStationList[] | undefined>(
    []
  );

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

  return (
    <div className="py-4 space-y-3">
      <h3 className="text-slate-600 text-center text-2xl font-semibold">
        Tren <span className="text-slate-700">Bileti</span> Sorgulama
      </h3>
      <form>
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
          />
        </div>
        <FormInput />
      </form>
      <button className="w-full px-4 py-2 border border-blue-500 rounded-lg  font-semibold hover:bg-blue-600  hover:text-white transition  duration-200 ease-linear ">
        Sorgula
      </button>
    </div>
  );
};

export default FormArea;
