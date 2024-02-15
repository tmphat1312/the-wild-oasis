import { TableRow } from "@/types/table-row";
import { APIClientBuilder } from "./APIClient";

const bookingClient = APIClientBuilder("bookings");

export async function getBookings() {
  const { data, error } = await bookingClient.select();
  const bookings: TableRow<"bookings">[] = data || [];

  if (error) {
    throw error;
  }

  return bookings;
}
