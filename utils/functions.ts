import { formatInTimeZone } from "date-fns-tz";
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