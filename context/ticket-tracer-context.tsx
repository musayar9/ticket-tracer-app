"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

type TicketContextType = {
  searchTicket: [];
  setSearchTicket: React.Dispatch<React.SetStateAction<[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [searchTicket, setSearchTicket] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const value = { searchTicket, setSearchTicket, loading, setLoading };

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