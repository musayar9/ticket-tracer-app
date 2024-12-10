import { formatInTimeZone } from "date-fns-tz";
import {
  addDays,
  differenceInMinutes,
  format,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import { tr } from "date-fns/locale";
export const formatCustomDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const newDate = addDays(date, 0);
  const finalDate = setSeconds(
    setMinutes(setHours(newDate, now.getHours()), now.getMinutes()),
    now.getSeconds()
  );

  return format(finalDate, "dd-MM-yyyy HH:mm:ss");
};

export const formateHour = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    const timeZone = "Europe/Istanbul";
    const formattedDate = formatInTimeZone(date, timeZone, "HH:mm");
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

type HoursMinutes = {
  departuresDate: string;
  arrivalsDate: string;
};

export const formattedHoursMinutes = ({
  departuresDate,
  arrivalsDate,
}: HoursMinutes): string => {
  const departureDate = new Date(departuresDate);
  const arrivalDate = new Date(arrivalsDate);

  const totalMinutes = differenceInMinutes(arrivalDate, departureDate);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes}dk`;
  }

  return `${hours}sa${minutes}dk`;
};

export const formattedDate = (value: string): string => {
  const date = new Date(value);

  const formatDate = format(date, "dd.MM.yyyy");

  return formatDate;
};

export const getFormatDay = (dateString: string): string => {
  const date = new Date(dateString);

  const day = format(date, "EEEE", { locale: tr });

  return day;
};
