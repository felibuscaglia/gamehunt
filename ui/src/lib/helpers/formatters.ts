import { convertDateToUtc } from "./converters";

export const formatDateAsString = (inputDate: string): string => {
  const today = convertDateToUtc();
  const targetDate = convertDateToUtc(new Date(inputDate));
  const yesterday = convertDateToUtc();
  yesterday.setDate(today.getDate() - 1);

  if (targetDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return targetDate.toLocaleDateString("en-US", { weekday: "long" });
  }
};
