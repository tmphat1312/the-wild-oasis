import { ITEMS_PER_PAGE } from "@/constants/API";
import {
  BookingDetailValues,
  bookingArraySchema,
  bookingDetailSchema,
  statisticsBookingArraySchema,
} from "@/schemas/bookingSchema";
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

interface GetBookingArgs {
  bookingId: BookingDetailValues["id"];
}

export async function getBooking({ bookingId }: GetBookingArgs) {
  try {
    const { data } = await buildAPIClient("bookings")
      .select("*, cabins(*), guests(*)")
      .eq("id", bookingId)
      .single()
      .throwOnError();

    return bookingDetailSchema.parse(data);
  } catch (error) {
    console.error(error);
    throw Error(`Booking #${bookingId} not found`);
  }
}

interface DeleteBookingArgs {
  bookingId: BookingDetailValues["id"];
}

export async function deleteBookingById({ bookingId }: DeleteBookingArgs) {
  try {
    await buildAPIClient("bookings")
      .delete()
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot delete booking #${bookingId}!`);
  }
}

interface CheckOutBookingArgs {
  bookingId: BookingDetailValues["id"];
}

export async function checkOutBooking({ bookingId }: CheckOutBookingArgs) {
  try {
    await buildAPIClient("bookings")
      .update({ status: "checked out" })
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot check out booking #${bookingId}!`);
  }
}

interface UpdateBookingArgs {
  bookingId: BookingDetailValues["id"];
  data: Partial<BookingDetailValues>;
}

export async function updateBooking({ bookingId, data }: UpdateBookingArgs) {
  try {
    await buildAPIClient("bookings")
      .update(data)
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot update booking #${bookingId}!`);
  }
}

interface GetBookingsFromLastNDaysArgs {
  n: number;
}

export async function getBookingsFromLastNDays({
  n: lastNDays,
}: GetBookingsFromLastNDaysArgs) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - lastNDays);

  try {
    const { data } = await buildAPIClient("bookings")
      .select(
        "id, start_date, end_date, total_due, created_at, is_paid, status, no_nights, guests(*)",
      )
      .gte("created_at", startDate.toISOString())
      .lte("created_at", today.toISOString())
      .throwOnError();

    return statisticsBookingArraySchema.parse(data);
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings from last N days");
  }
}

interface GetStaysFromLastNDaysArgs {
  n: number;
}

export async function getStaysFromLastNDays({
  n: lastNDays,
}: GetStaysFromLastNDaysArgs) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - lastNDays);

  try {
    const { data } = await buildAPIClient("bookings")
      .select(
        "id, start_date, end_date, total_due, created_at, is_paid, status, no_nights, guests(*)",
      )
      .or("status.eq.checked in, status.eq.checked out")
      .gte("start_date", startDate.toISOString())
      .lte("start_date", today.toISOString())
      .throwOnError();

    return statisticsBookingArraySchema.parse(data);
  } catch (error) {
    console.error(error);
    throw Error("Error fetching stays from last N days");
  }
}
