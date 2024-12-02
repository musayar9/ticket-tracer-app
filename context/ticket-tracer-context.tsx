"use client";

// import { getTicketFromLocalStorage } from "@/utils/localStorage";
import { SearchTicketType } from "@/utils/types";
import React, { createContext, useContext, ReactNode, useState } from "react";

// export const getTicketFromLocalStorage = () => {

//     const result = localStorage.getItem("ticket");
//     const ticket = result ? JSON.parse(result) : [];
//     return ticket;

// };

type TicketContextType = {
  searchTicket: SearchTicketType[] | undefined;
  setSearchTicket: React.Dispatch<
    React.SetStateAction<SearchTicketType[] | undefined>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [searchTicket, setSearchTicket] = useState<
    SearchTicketType[] | undefined
  >(undefined);
  // const searchTicket = getTicketFromLocalStorage()
  // useEffect(() => {
  // const result = localStorage.getItem("ticket")
  // const ticket = result ? JSON.parse(result) : [];
  // setSearchTicket(ticket)
  // }, [])
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const value = {
    searchTicket,
    setSearchTicket,
    loading,
    setLoading,
    email,
    setEmail,
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
