import React from "react";
import { FromStationList } from "@/utils/types";
type SearchFilterListsProps = {
  stationData: FromStationList[] | undefined;
  setStation: React.Dispatch<React.SetStateAction<string>>;
  dropdown: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  openDeparture: boolean;
  openArrival: boolean;
  isStation?: React.Dispatch<React.SetStateAction<boolean | null>>;
  styles: string;
};
const SearchFilterLists = ({
  stationData,
  isStation,
  setStation,
  dropdown,
  openArrival,
  openDeparture,
  styles,
}: SearchFilterListsProps) => {
  return (
    <div className={`${styles} relative z-20`}>
      <div
        className={`dropdown-menu  absolute ${
          openDeparture && "left-[98px]"
        }  ${openArrival && "right-[98px]"}`}
      ></div>
      <div className="  absolute bg-white shadow-lg rounded-md border  border-slate-300 w-full mt-4 p-4 h-auto max-h-56 overflow-auto">
        {stationData && stationData?.length > 0 ? (
          <div>
            <h3 className="text-slate-700 font-semibold py-2 pl-2">
              Tüm İstasyonlar
            </h3>
            {stationData?.map((station) => (
              <div
                key={station?.stationID}
                className="flex items-center justify-between gap-1 p-3 border-b hover:z-30 border-slate-200 hover:bg-blue-100 rounded-md cursor-pointer transition-all duration-200 ease-in"
                onClick={() => {
                  setStation(station?.stationName);
                  dropdown(false);
                  if (isStation) {
                    isStation(true);
                  }
                }}
              >
                <div>
                  <h4 className="text-slate-500 text-sm">İstasyon</h4>
                  <div className="uppercase flex items-center text-slate-600 text-sm">
                    <p>{station?.stationName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-sm hidden md:block">
                    {station?.stationTrainType &&
                    station.stationTrainType[0] === "AH"
                      ? "AH"
                      : "BOLGESEL"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-slate-600 font-semibold ">Sonuç Bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterLists;
