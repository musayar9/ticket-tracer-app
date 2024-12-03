import { formatInTimeZone } from "date-fns-tz";
import { differenceInMinutes, format } from "date-fns";
export const formatCustomDate = (dateString: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const selectedDate = new Date(dateString);

  const formattedDate = `${months[selectedDate.getMonth()]} ${(
    "0" + selectedDate.getDate()
  ).slice(-2)}, ${selectedDate.getFullYear()} 00:00:00 AM`;

  return formattedDate;
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
