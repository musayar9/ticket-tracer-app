"use client";

import { SearchTicketType, SelectedTrains } from "@/utils/types";
import React, { createContext, useContext, ReactNode, useState } from "react";

type TicketContextType = {
  searchTicket: SearchTicketType[] | undefined;
  setSearchTicket: React.Dispatch<
    React.SetStateAction<SearchTicketType[] | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  selectTrain: SearchTicketType[];
  setSelectTrain: React.Dispatch<React.SetStateAction<SearchTicketType[]>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTrainTickets: SelectedTrains[] | undefined;
  setSelectedTrainTickets: React.Dispatch<
    React.SetStateAction<SelectedTrains[]>
  >;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [searchTicket, setSearchTicket] = useState<
    SearchTicketType[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [selectTrain, setSelectTrain] = useState<SearchTicketType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainTickets, setSelectedTrainTickets] = useState<
    SelectedTrains[]
  >([]);

  const value = {
    searchTicket,
    setSearchTicket,
    loading,
    setLoading,
    email,
    setEmail,
    selectTrain,
    setSelectTrain,
    showModal,
    setShowModal,
    selectedTrainTickets,
    setSelectedTrainTickets,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

export const useGlobalContext = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a TicketProvider");
  }
  return context;
};
export default TicketProvider;
