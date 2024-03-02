import { differenceInDays, parseISO } from "date-fns";

export function subtractDates(date1: string | Date, date2: string | Date) {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)));
}

export function getStartToday() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
}

export function getEndToday() {
  const today = new Date();
  today.setUTCHours(23, 59, 59, 999);
  return today.toISOString();
}
