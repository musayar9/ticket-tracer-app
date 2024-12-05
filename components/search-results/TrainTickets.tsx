"use client"
import { useGlobalContext } from '@/context/ticket-tracer-context';
import { formateHour, formattedDate, formattedHoursMinutes } from '@/utils/functions';
import { SearchTicketType } from '@/utils/types';
import Image from 'next/image';

import toast from 'react-hot-toast';
import { BsFillPatchMinusFill, BsPatchPlusFill } from 'react-icons/bs';
import { LuArmchair } from 'react-icons/lu';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { TbDisabled } from 'react-icons/tb';

type TrainTicketsProps = {
isSelected:boolean;
item:SearchTicketType
}



const TrainTickets:React.FC<TrainTicketsProps> = ({item, isSelected}) => {
  const {selectTrain, setSelectTrain} = useGlobalContext()

  const handleSelectTrain = (train: SearchTicketType) => {
    if (
      selectTrain.some(
        (selectedTrain) => selectedTrain.trainID === train.trainID
      )
    ) {
      setSelectTrain(
        selectTrain.filter(
          (selectedTrain) => selectedTrain.trainID !== train.trainID
        )
      );
    } else {
      if (selectTrain.length < 3) {
       setSelectTrain([...selectTrain, train]);
      } else {
        toast.error("En fazla 3 sefer seçebilirsiniz");
      }
    }
  };

  return (
    <div
  
      className={`${
        item?.emptyPlace?.normalPeopleEmptyPlaceCount === 0
          ? `${isSelected ? "bg-emerald-200" : "bg-[#fff]"}`
          : "bg-[#edf0f4]"
      } flex flex-wrap md:flex-nowrap md:grid grid-cols-9 items-center  gap-2 box-border  shadow-xl rounded-3xl p-4 relative`}
    >
      <div className="p-4 pl-10 md:pl-0 md:p-2 self-center md:col-span-1">
        {/* Departure Station */}
        <Image
          width={100}
          height={100}
          src="/images/train.svg"
          className="w-32 h-auto md:w-28 lg:w-30  p-2  "
          alt="logo"
        />
      </div>

      <div className=" seferDepartureArrival   flex items-start justify-center md:col-span-6 box-border flex-col md:pl-6 md:pr-6 border-t-2 border-b-2 md:border-t-0 md:border-b-0 -mt-3 md:mt-0 py-2 md:py-0  md:border-l-2 md:border-r-2  border-slate-500 border-dotted">
        <p className="text-[12px] md:text-[14px] lg:text-[17px]">
          <span className="text-[#444763] font-semibold">YHT:</span>
          <span className="text-[#444763] ">{item.trainName}</span>
        </p>

        <div className=" grid grid-cols-8 w-full text-[#8392a7] text-[11px] md:text-[14px]  font-semibold mt-4 mr-0 ml-0">
          <span className="col-span-2 truncate ">{item.departureStation}</span>
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
        <div className="flex items-center justify-between  w-full ">
          <span className="text-[#444763] font-bold text-[14px] md:text-[24px]">
            {formateHour(item.departureDate)}
          </span>
          <span className=" horizontalHR "></span>

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
      <div className="flex gap-1 mt-1 md:col-span-2 md:mt-0 md:p-4 flex-col box-border">
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
            <span>({item.emptyPlace.normalPeopleEmptyPlaceCount})</span>
          </p>
        </div>
      </div>

      <button
        onClick={() => handleSelectTrain(item)}
        disabled={item.emptyPlace.normalPeopleEmptyPlaceCount !== 0}
        className={`${
          item.emptyPlace.normalPeopleEmptyPlaceCount !== 0
            ? "hidden"
            : " flex bg-emerald-500  hover:bg-emerald-600 duration-200 ease-linear"
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
}

export default TrainTickets