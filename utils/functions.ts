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
