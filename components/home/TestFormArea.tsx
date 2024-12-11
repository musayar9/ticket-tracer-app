"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundForward } from "react-icons/io";
import FormInputs from "../FormInputs";
import SearchFilterLists from "./SearchFilterLists";
import { LuArrowRightToLine } from "react-icons/lu";
const departureData = [
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
const arrivalData = [
  {
    id: 1,
    stationName: "Ankara YHT Garı",
    city: "Ankara",
  },
  {
    id: 2,
    stationName: "Söğütlüçeşme",
    city: "İstanbul",
  },
  {
    id: 3,
    stationName: "Bostancı",
    city: "İstanbul",
  },
  {
    id: 4,
    stationName: "Kartal",
    city: "İstanbul",
  },
  {
    id: 5,
    stationName: "Gebze",
    city: "Kocaeli",
  },
  {
    id: 6,
    stationName: "İzmit YHT Garı",
    city: "Kocaeli",
  },
  {
    id: 7,
    stationName: "Arifiye YHT Garı",
    city: "Sakarya",
  },
  {
    id: 8,
    stationName: "Bilecik YHT Garı",
    city: "Bilecik",
  },
  {
    id: 9,
    stationName: "Bozüyük YHT Garı",
    city: "Bilecik",
  },
  {
    id: 10,
    stationName: "Eskişehir YHT Garı",
    city: "Eskişehir",
  },
  {
    id: 11,
    stationName: "Polatlı YHT Garı",
    city: "Ankara",
  },
  {
    id: 12,
    stationName: "Konya YHT Garı",
    city: "Konya",
  },
  {
    id: 13,
    stationName: "Selçuklu YHT Garı",
    city: "Konya",
  },
  {
    id: 14,
    stationName: "Karaman YHT Garı",
    city: "Karaman",
  },
  {
    id: 15,
    stationName: "Sincan YHT Garı",
    city: "Ankara",
  },
];
export type DataType = {
  id: number;
  stationName: string;
  city: string;
};
// const TestFormArea = () => {
//   const [departureStations, setDepartureStations] = useState<
//     DataType[] | undefined
//   >([]);
//   const [departure, setDeparture] = useState("");
//   const [isDeparture, setIsDeparture] = useState<boolean | null>(null);
//   const [openDepartureDropdown, setOpenDepartureDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const departureRef = useRef<HTMLDivElement>(null);
//   const arrivalRef = useRef<HTMLDivElement>(null);
//   const [arrival, setArrival] = useState("");
//   const [openArrivalDropdown, setOpenArrivalDropDown] = useState(false);
//   const [isArrival, setIsArrival] = useState<boolean | null>(null);

//   const handleDeparture = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setDeparture(e.target.value);
//   };
//   const handleArrival = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setArrival(e.target.value);
//   };

//   useEffect(() => {
//     if (departure) {
//       const result = departureData.filter(
//         (item) =>
//           item.city
//             .toLocaleLowerCase("TR")
//             .includes(departure.toLocaleLowerCase("TR")) ||
//           item.stationName
//             .toLocaleLowerCase("TR")
//             .includes(departure.toLocaleLowerCase("TR"))
//       );
//       setDepartureStations(result);
//     }

//     if (arrival) {
//       const result = arrivalData.filter(
//         (item) =>
//           item.city
//             .toLocaleLowerCase("TR")
//             .includes(arrival.toLocaleLowerCase("TR")) ||
//           item.stationName
//             .toLocaleLowerCase("TR")
//             .includes(arrival.toLocaleLowerCase("TR"))
//       );
//       setDepartureStations(result);
//     }
//   }, [departure, arrival]);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpenDepartureDropdown(false);
//         setOpenArrivalDropDown(false);
//         if (isDeparture) {
//           setIsDeparture(false);
//           // setIsArrival(true)

//         }
//         if(isArrival){
//         setIsArrival(false)
//           // setIsDeparture(true);
//         }
//       }

//       if (
//         arrivalRef.current &&
//         !arrivalRef.current.contains(event.target as Node)
//       ) {
//         setOpenDepartureDropdown(false);
//       }
//       if (
//         departureRef.current &&
//         !departureRef.current.contains(event.target as Node)
//       ) {
//         setOpenArrivalDropDown(false);
//       }
//     };

//     if (openDepartureDropdown || openArrivalDropdown) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [openDepartureDropdown, openArrivalDropdown]);

//   return (
//     <>
//       <div className="relative" ref={dropdownRef}>
//         <div className="flex items-center gap-2">
//           <FormInputs
//             value={departure}
//             onChange={handleDeparture}
//             onFocus={() => {
//               setOpenDepartureDropdown(true);
//               setIsDeparture(true);
//             }}
//             id={"departure_station"}
//             label={"Nereden"}
//             icon={<GoDotFill />}
//             arrowIcon={<IoMdArrowRoundForward className="-ml-1" />}
//             ref={departureRef}
//             message={isDeparture === false ? "gerekli alan" : undefined}
//           />

//           <FormInputs
//             value={arrival}
//             onChange={handleArrival}
//             onFocus={() => {
//               setOpenArrivalDropDown(true);
//               setIsArrival(true);
//             }}
//             id={"arrival_station"}
//             label={"Nereye"}
//             icon={<LuArrowRightToLine />}
//             ref={arrivalRef}
//             disabled={departure === "" && isArrival===false}
//             message={isArrival === false ? "gerekli alan" : undefined}
//           />
//         </div>
//         {openDepartureDropdown && departure && (
//           <>
//             <SearchFilterLists
//               stationData={departureStations}
//               setStation={setDeparture}
//               dropdown={setOpenDepartureDropdown}
//               openDeparture={openDepartureDropdown}
//               value={departure}
//               openArrival={false}
//               isStation={setIsDeparture}
//             />
//           </>
//         )}

//         {openArrivalDropdown && arrival && (
//           <SearchFilterLists
//             stationData={departureStations}
//             setStation={setArrival}
//             openArrival={openArrivalDropdown}
//             value={arrival}
//             openDeparture={false}
//             dropdown={setOpenArrivalDropDown}
//             isStation={setIsArrival}
//           />
//         )}
//       </div>
//     </>
//   );
// };
const TestFormArea = () => {
  const [departureStations, setDepartureStations] = useState<
    DataType[] | undefined
  >([]);
  const [departure, setDeparture] = useState("");
  const [isDeparture, setIsDeparture] = useState<boolean | null>(null);
  const [openDepartureDropdown, setOpenDepartureDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const departureRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const [arrival, setArrival] = useState("");
  const [openArrivalDropdown, setOpenArrivalDropDown] = useState(false);
  const [isArrival, setIsArrival] = useState<boolean | null>(null);
  const [departureError, setDepartureError] = useState<string | null>(null);
  const [arrivalError, setArrivalError] = useState<string | null>(null);

  const handleDeparture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
    setDepartureError(null);
  };

  const handleArrival = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrival(e.target.value);
    setArrivalError(null);
  };

  useEffect(() => {
    if (departure) {
      const result = departureData.filter(
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

    if (arrival) {
      const result = arrivalData.filter(
        (item) =>
          item.city
            .toLocaleLowerCase("TR")
            .includes(arrival.toLocaleLowerCase("TR")) ||
          item.stationName
            .toLocaleLowerCase("TR")
            .includes(arrival.toLocaleLowerCase("TR"))
      );
      setDepartureStations(result);
    }
  }, [departure, arrival]);

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
            !departure ||
            !departureData.some((station) => station.stationName === departure)
          ) {
            setDepartureError("Tren Kalkış Alanı Gereklidir");
            setArrival("");
          }
          setIsDeparture(false);
        }

        if (isArrival) {
          if (
            !arrival ||
            !arrivalData.some((station) => station.stationName === arrival)
          ) {
            setArrivalError("Tren Varış Alanı Gereklidir");
          }
          setIsArrival(false);
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
    if (
      !departure ||
      !departureData.some((station) => station.stationName === departure)
    ) {
      setArrival("");
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
    departure,
    arrival,
    isDeparture,
    isArrival,
  ]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2">
          <FormInputs
            value={departure}
            onChange={handleDeparture}
            onFocus={() => {
              setOpenDepartureDropdown(true);
              setIsDeparture(true);
            }}
            id={"departure_station"}
            label={"Nereden"}
            icon={<GoDotFill />}
            arrowIcon={<IoMdArrowRoundForward className="-ml-1" />}
            ref={departureRef}
            message={departureError}
          />

          <FormInputs
            value={arrival}
            onChange={handleArrival}
            onFocus={() => {
              setOpenArrivalDropDown(true);
              setIsArrival(true);
            }}
            id={"arrival_station"}
            label={"Nereye"}
            icon={<LuArrowRightToLine />}
            ref={arrivalRef}
            disabled={!departure || !!departureError}
            message={arrivalError}
          />
        </div>
        {openDepartureDropdown && departure && (
          <SearchFilterLists
            stationData={departureStations}
            setStation={(stationName) => {
              setDeparture(stationName);
              setDepartureError(null);
            }}
            dropdown={setOpenDepartureDropdown}
            openDeparture={openDepartureDropdown}
            value={departure}
            openArrival={false}
            isStation={setIsDeparture}
          />
        )}

        {openArrivalDropdown && arrival && (
          <SearchFilterLists
            stationData={departureStations}
            setStation={(stationName) => {
              setArrival(stationName);
              setArrivalError(null);
            }}
            openArrival={openArrivalDropdown}
            value={arrival}
            openDeparture={false}
            dropdown={setOpenArrivalDropDown}
            isStation={setIsArrival}
          />
        )}
      </div>
    </>
  );
};

export default TestFormArea;
