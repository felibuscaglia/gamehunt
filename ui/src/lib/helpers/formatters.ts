import { convertDateToUtc } from "./converters";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDateAsString = (inputDate: string): string => {
  const today = convertDateToUtc();
  const targetDate = convertDateToUtc(new Date(inputDate));
  const yesterday = convertDateToUtc();
  yesterday.setDate(today.getDate() - 1);

  let dayDiff: string;

  if (targetDate.toDateString() === today.toDateString()) {
    dayDiff = "Today";
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    dayDiff = "Yesterday";
  } else {
    dayDiff = targetDate.toLocaleDateString("en-US", { weekday: "long" });
  }
  
  const dayJsDate = dayjs(targetDate);

  return `${dayDiff} ${dayJsDate.format('MMMM Do')}`
};
