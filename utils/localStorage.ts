"use client";
import { SearchTicketType } from "./types";

export const addTicketToLocalStorage = (ticket: SearchTicketType) => {
  if (!ticket) {
    return "eklenecek bilet bulunamadı";
  }

  localStorage.setItem("ticket", JSON.stringify(ticket));
};

// export const getTicketFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const result = localStorage.getItem("ticket");
//     const ticket = result ? JSON.parse(result) : [];
//     return ticket;
//   }
//   return [];
// };
export const removeTicketFromLocalStorage = () => {
  localStorage.removeItem("");
};
