import { TableRow } from "@/types/table-row";
import { BuildAPIClient } from "./APIClient";

export async function getBookings() {
  const { data } = await BuildAPIClient("bookings").select().throwOnError();
  const bookings: TableRow<"bookings">[] = data || [];

  return bookings;
}
