import { bookingArraySchema } from "@/schemas/bookingSchema";
import { buildAPIClient } from "./APIClient";
import { FilterFieldOption } from "@/types/API";

interface GetBookingsArgs {
  filterOptions?: FilterFieldOption[];
}

export async function getBookings({ filterOptions = [] }: GetBookingsArgs) {
  let query = buildAPIClient("bookings").select(
    "id, created_at, start_date, end_date, no_nights, no_guests, status, total_due, cabins(name), guests(full_name, email)",
    { count: "exact" },
  );

  // Filter bookings
  filterOptions.forEach(({ field, value }) => {
    if (value !== "") {
      query = query.eq(field, value);
    }
  });

  try {
    const { data, count } = await query.throwOnError();
    // .eq("status", "checked in")
    // .range(0, 9)

    const bookings = bookingArraySchema.parse(data);

    return { bookings, count: Number(count) };
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings");
  }
}
