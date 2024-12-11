import React from 'react'
import { DataType } from './TestFormArea'

type SearchFilterListsProps = {
  stationData: DataType[] | undefined;
  setStation: React.Dispatch<React.SetStateAction<string>>;
  dropdown: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  openDeparture: boolean;
  openArrival: boolean;
  isStation?: React.Dispatch<React.SetStateAction<boolean | null>>;
};
const SearchFilterLists = ({
  stationData,
  isStation,
  setStation,
  dropdown,
  openArrival,
  openDeparture,
}: SearchFilterListsProps) => {
  return (
    <div className="relative">
      {/* <div
              className="absolute -top-[3px] mt-2 z-10 left-[98px] transform rotate-90 w-[21px] h-[24px] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMi40IDM4Ljk2Ij48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6I2ZmZjtzdHJva2U6I2Q5ZDlkOTtzdHJva2UtbWl0ZXJsaW1pdDoxMH08L3N0eWxlPjwvZGVmcz48ZyBpZD0iUG9seWdvbl8xMC0yIiBkYXRhLW5hbWU9IlBvbHlnb24gMTAtMiI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMS42MSAyMS44MWEzLjAwMSAzLjAwMSAwIDAxMC00LjY3TDE2LjIyIDUuMzVhMy4wMDEgMy4wMDEgMCAwMTQuMjIuNDVjLjQzLjUzLjY3IDEuMi42NyAxLjg5djIzLjU5YzAgMS42Ni0xLjM0IDMtMyAzLS42OSAwLTEuMzUtLjI0LTEuODktLjY3TDEuNjEgMjEuODF6Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMS41IDE5LjQ4YzAgLjYxLjI3IDEuMTcuNzQgMS41NmwxNC42MSAxMS44Yy42MS41IDEuNDEuNTkgMi4xMi4yNS43MS0uMzQgMS4xNC0xLjAyIDEuMTQtMS44VjcuNjhjMC0uNzktLjQzLTEuNDYtMS4xNC0xLjgtLjcxLS4zNC0xLjUtLjI1LTIuMTIuMjVMMi4yNCAxNy45MmMtLjQ3LjM4LS43NC45NS0uNzQgMS41Nm0tMSAwYzAtLjg3LjM3LTEuNzMgMS4xMS0yLjMzbDE0LjYxLTExLjhjMS45Ni0xLjU4IDQuODktLjE5IDQuODkgMi4zM3YyMy42YzAgMi41Mi0yLjkyIDMuOTItNC44OSAyLjMzTDEuNjEgMjEuODFDLjg3IDIxLjIxLjUgMjAuMzQuNSAxOS40OHoiLz48L2c+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE2LjUyIDBoNS44N3YzOC45NmgtNS44N3oiLz48L3N2Zz4=)",
              }}
            ></div> */}
      <div
        className={`dropdown-menu absolute ${openDeparture && "left-[98px]"}  ${
          openArrival && "right-[98px]"
        }`}
      ></div>

      {/* <div className="absolute top-1 left-1/2 mt-3 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10  bg-white border-l border-t border-slate-300 rotate-45"></div> */}
      <div className="  absolute bg-white shadow-lg rounded-md border  border-slate-300 w-full mt-4 p-4 h-auto max-h-56 overflow-auto">
        {stationData && stationData?.length > 0 ? (
          <div>
            <h3 className="text-slate-700 font-semibold py-2 pl-2">
              Tüm İstasyonlar
            </h3>
            {stationData?.map((station) => (
              <div
                key={station?.id}
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
                    <p>{station?.stationName},</p>
                    <p>{station?.city}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 uppercase text-sm">Anahat</p>
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

export default SearchFilterLists