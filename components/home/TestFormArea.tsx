"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundForward } from "react-icons/io";
const data = [
  {
    id: 1,
    stationName: "Ankara Garı",
    city: "Ankara",
  },
  {
    id: 2,
    stationName: "Eryaman",
    city: "Ankara",
  },
  {
    id: 3,
    stationName: "Polatlı",
    city: "Ankara",
  },
  {
    id: 4,
    stationName: "Eskişehir Garı",
    city: "Eskişehir",
  },
  {
    id: 5,
    stationName: "Bozüyük",
    city: "Bilecik",
  },
  {
    id: 6,
    stationName: "Bilecik Garı",
    city: "Bilecik",
  },
  {
    id: 7,
    stationName: "Arifiye",
    city: "Sakarya",
  },
  {
    id: 8,
    stationName: "Pendik",
    city: "İstanbul",
  },
  {
    id: 9,
    stationName: "Halkalı",
    city: "İstanbul",
  },
  {
    id: 10,
    stationName: "Konya Garı",
    city: "Konya",
  },
  {
    id: 11,
    stationName: "Selçuklu",
    city: "Konya",
  },
  {
    id: 12,
    stationName: "Karaman Garı",
    city: "Karaman",
  },
  {
    id: 13,
    stationName: "Sincan",
    city: "Ankara",
  },
  {
    id: 14,
    stationName: "Gebze",
    city: "Kocaeli",
  },
  {
    id: 15,
    stationName: "İzmit Garı",
    city: "Kocaeli",
  },
];

type DataType = {
  id: number;
  stationName: string;
  city: string;
};
const TestFormArea = () => {
  const [departureStations, setDepartureStations] = useState<
    DataType[] | undefined
  >([]);
  const [departure, setDeparture] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
  };

  useEffect(() => {
    if (departure) {
      const result = data.filter(
        (item) =>
          item.city
            .toLocaleLowerCase("TR")
            .includes(departure.toLocaleLowerCase("TR")) ||
          item.stationName
            .toLocaleLowerCase("TR")
            .includes(departure.toLocaleLowerCase("TR"))
      );
      setDepartureStations(result);
    }
  }, [departure]);
  
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpenDropdown(false);
        }
      };

      if (openDropdown) {
        document.addEventListener("mousedown", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [openDropdown]);
  console.log(departureStations, "departure statiıns");
  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <input
            type="text"
            id="floating_helper"
            aria-describedby="floating_helper_text"
            className="block rounded-lg border border-slate-300 px-2.5 pb-1.5 pt-7 w-full text-md text-gray-900
    bg-[#fff] focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            value={departure}
            onChange={handleChange}
            onFocus={() => setOpenDropdown(true)}
          />
          <label
            htmlFor="floating_helper"
            className="absolute flex items-center  text-md text-gray-700  duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-2.5
    peer-focus:text-slate-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            <GoDotFill />
            <IoMdArrowRoundForward className="-ml-1" />
            Nereden
          </label>
        </div>

        {openDropdown && departure && (
          <div className="relative">
            {/* <div
              className="absolute -top-[3px] mt-2 z-10 left-[98px] transform rotate-90 w-[21px] h-[24px] bg-no-repeat"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMi40IDM4Ljk2Ij48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6I2ZmZjtzdHJva2U6I2Q5ZDlkOTtzdHJva2UtbWl0ZXJsaW1pdDoxMH08L3N0eWxlPjwvZGVmcz48ZyBpZD0iUG9seWdvbl8xMC0yIiBkYXRhLW5hbWU9IlBvbHlnb24gMTAtMiI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMS42MSAyMS44MWEzLjAwMSAzLjAwMSAwIDAxMC00LjY3TDE2LjIyIDUuMzVhMy4wMDEgMy4wMDEgMCAwMTQuMjIuNDVjLjQzLjUzLjY3IDEuMi42NyAxLjg5djIzLjU5YzAgMS42Ni0xLjM0IDMtMyAzLS42OSAwLTEuMzUtLjI0LTEuODktLjY3TDEuNjEgMjEuODF6Ii8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMS41IDE5LjQ4YzAgLjYxLjI3IDEuMTcuNzQgMS41NmwxNC42MSAxMS44Yy42MS41IDEuNDEuNTkgMi4xMi4yNS43MS0uMzQgMS4xNC0xLjAyIDEuMTQtMS44VjcuNjhjMC0uNzktLjQzLTEuNDYtMS4xNC0xLjgtLjcxLS4zNC0xLjUtLjI1LTIuMTIuMjVMMi4yNCAxNy45MmMtLjQ3LjM4LS43NC45NS0uNzQgMS41Nm0tMSAwYzAtLjg3LjM3LTEuNzMgMS4xMS0yLjMzbDE0LjYxLTExLjhjMS45Ni0xLjU4IDQuODktLjE5IDQuODkgMi4zM3YyMy42YzAgMi41Mi0yLjkyIDMuOTItNC44OSAyLjMzTDEuNjEgMjEuODFDLjg3IDIxLjIxLjUgMjAuMzQuNSAxOS40OHoiLz48L2c+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE2LjUyIDBoNS44N3YzOC45NmgtNS44N3oiLz48L3N2Zz4=)",
              }}
            ></div> */}
{/* <div className="dropdown-menu"></div> */}
            
            <div className="absolute top-1 left-1/2 mt-3 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10  bg-white border-l border-t border-slate-300 rotate-45"></div>
            <div className="  absolute bg-white shadow-lg rounded-md border  border-slate-300 w-full mt-4 p-4 h-auto max-h-56 overflow-auto">
              {departureStations && departureStations?.length > 0 ? (
                <div >
                  <h3 className="text-slate-700 font-semibold py-2 pl-2">
                    Tüm İstasyonlar
                  </h3>
                  {departureStations?.map((departure) => (
                    <div
                      key={departure?.id}
                      className="flex items-center justify-between gap-1 p-3 border-b hover:z-30 border-slate-200 hover:bg-blue-100 rounded-md cursor-pointer transition-all duration-200 ease-in"
                      onClick={() => {
                        setDeparture(departure?.stationName);
                        setOpenDropdown(false);
                      }}
                    >
                      <div>
                        <h4 className="text-slate-500 text-sm">İstasyon</h4>
                        <div className="uppercase flex items-center text-slate-600 text-sm">
                          <p>{departure?.stationName},</p>
                          <p>{departure?.city}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500 uppercase text-sm">
                          Anahat
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-slate-600 font-semibold ">
                    Sonuç Bulunamadı
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestFormArea;
