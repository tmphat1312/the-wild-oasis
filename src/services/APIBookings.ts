import { ITEMS_PER_PAGE } from "@/constants/API";
import { bookingArraySchema } from "@/schemas/bookingSchema";
import { FilterFieldOption, SortFieldOption } from "@/types/API";
import { buildAPIClient } from "./APIClient";

interface GetBookingsArgs {
  filterOptions?: FilterFieldOption[];
  sortOption?: SortFieldOption;
  page?: number;
}

export async function getBookings({
  filterOptions = [],
  sortOption = {
    field: "",
    order: { ascending: true },
  },
  page = 1,
}: GetBookingsArgs) {
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

  // Sort bookings
  if (sortOption.field) {
    query = query.order(sortOption.field, sortOption.order);
  }

  // Paginate bookings
  if (page > 1) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    query = query.range(start, end);
  }

  // limit bookings
  query = query.limit(ITEMS_PER_PAGE);

  try {
    const { data, count } = await query.throwOnError();
    const bookings = bookingArraySchema.parse(data);

    return { bookings, count: Number(count) };
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings");
  }
}