import { bookingArraySchema } from "@/schemas/bookingSchema";
import { buildAPIClient } from "./APIClient";

export async function getBookings() {
  try {
    const { data, count } = await buildAPIClient("bookings")
      .select(
        "id, created_at, start_date, end_date, no_nights, no_guests, status, total_due, cabins(name), guests(full_name, email)",
        { count: "exact" },
      )
      .throwOnError();

    const bookings = bookingArraySchema.parse(data);

    return { bookings, count: Number(count) };
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings");
  }
}
