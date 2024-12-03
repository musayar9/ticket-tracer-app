"use client";
import { useGlobalContext } from "@/context/ticket-tracer-context";
import {  FaArrowRight } from "react-icons/fa6";
import CheckTrain from "@/components/search-results/CheckTrain";
import TrainTickets from "@/components/search-results/TrainTickets";
import TrainTicketsModal from "@/components/search-results/TrainTicketsModal";
const SearchTicket = () => {
  const { searchTicket,  selectedTrains, showModal, setShowModal } = useGlobalContext();
  if (!searchTicket || searchTicket.length === 0) {
    return <CheckTrain />;
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto p-2 md:p-8 ">
      <div className=" p-8 ">
        <div className="px-4 flex items-center justify-center ">
          <div className="text-lg md:text-xl lg:text-3xl flex flex-wrap items-center justify-center font-semibold gap-3">
            <p className="text-slate-700">Gidiş - </p>
            <p className="text-slate-600">
              {searchTicket[0]?.departureStation}
            </p>
            <FaArrowRight className="text-slate-600" />
            <p className="text-slate-600">{searchTicket[0]?.arrivalStation}</p>
          </div>
        </div>

        <div className="space-y-10 my-4 p-2 ">
          {searchTicket.map((item) => {
            const isSelected = selectedTrains.some(
              (selectedTrain) => selectedTrain.trainID === item.trainID
            );
            return (
              <TrainTickets
                key={item.tourID}
                item={item}
                isSelected={isSelected}
              />
            );
          })}
        </div>
        <>
          {selectedTrains.length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-5 right-2 border border-slate-300 hover:border-slate-50 hover:bg-emerald-500 font-semibold px-4 py-2 rounded-xl text-[#444763] hover:text-[#fff] text-xs
    transition    duration-200 ease-in "
            >
              Seçimi Tamamla
            </button>
          )}
        </>
        {showModal && (
          <TrainTicketsModal/>
        )}
      </div>
    </div>
  );
};

export default SearchTicket;
