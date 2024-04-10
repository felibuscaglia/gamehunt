import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(advancedFormat);

export const formatDateAsString = (inputDate: string): string => {
  const today = dayjs().utc().startOf('day');
  const targetDate = dayjs(inputDate).utc().startOf('day');
  const yesterday = dayjs().utc().subtract(1, 'day').startOf('day');

  let dayDiff: string;

  if (targetDate.isSame(today, 'day')) {
    dayDiff = "Today";
  } else if (targetDate.isSame(yesterday, 'day')) {
    dayDiff = "Yesterday";
  } else {
    dayDiff = targetDate.format("dddd");
  }
  
  const yearString = targetDate.year() !== today.year() ? `, ${targetDate.year()}` : '';

  return `${dayDiff} ${targetDate.format('MMMM Do')}${yearString}`;
};
