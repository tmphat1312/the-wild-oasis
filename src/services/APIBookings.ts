import { ITEMS_PER_PAGE } from "@/lib/constants";
import {
  BookingActivitySchema,
  BookingDetailSchema,
  BookingDetailType,
  BookingSchema,
  StatisticsBookingSchema,
} from "@/schemas/BookingSchema";
import { FilterFieldOption, SortFieldOption } from "@/types/API";
import { z } from "zod";
import { APIClient } from "./APIClient";

type GetBookingsArgs = {
  filterOptions?: FilterFieldOption[];
  sortOption?: SortFieldOption;
  page?: number;
};

export async function getBookings({
  filterOptions = [],
  sortOption = {
    field: "",
    order: { ascending: true },
  },
  page = 1,
}: GetBookingsArgs) {
  let query = APIClient.from("bookings").select(
    "id, created_at, start_date, end_date, no_nights, no_guests, status, total_due, cabins(name), full_name, email",
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
    const bookings = z.array(BookingSchema).parse(data);

    return { bookings, count: Number(count) };
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings");
  }
}

type GetBookingArgs = {
  bookingId: BookingDetailType["id"];
};

export async function getBooking({ bookingId }: GetBookingArgs) {
  try {
    const { data } = await APIClient.from("bookings")
      .select("*, cabins(*), full_name, email")
      .eq("id", bookingId)
      .single()
      .throwOnError();

    return BookingDetailSchema.parse(data);
  } catch (error) {
    console.error(error);
    throw Error(`Booking #${bookingId} not found`);
  }
}

type DeleteBookingArgs = {
  bookingId: BookingDetailType["id"];
};

export async function deleteBookingById({ bookingId }: DeleteBookingArgs) {
  try {
    await APIClient.from("bookings")
      .delete()
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot delete booking #${bookingId}!`);
  }
}

type CheckOutBookingArgs = {
  bookingId: BookingDetailType["id"];
};

export async function checkOutBooking({ bookingId }: CheckOutBookingArgs) {
  try {
    await APIClient.from("bookings")
      .update({ status: "checked out" })
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot check out booking #${bookingId}!`);
  }
}

type UpdateBookingArgs = {
  bookingId: BookingDetailType["id"];
  data: Partial<BookingDetailType>;
};

export async function updateBooking({ bookingId, data }: UpdateBookingArgs) {
  try {
    await APIClient.from("bookings")
      .update(data)
      .eq("id", bookingId)
      .throwOnError();
  } catch (error) {
    console.error(error);
    throw Error(`Cannot update booking #${bookingId}!`);
  }
}

type GetBookingsFromLastNDaysArgs = {
  n: number;
};

export async function getBookingsFromLastNDays({
  n: lastNDays,
}: GetBookingsFromLastNDaysArgs) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - lastNDays);

  try {
    const { data } = await APIClient.from("bookings")
      .select(
        "id, start_date, end_date, total_due, created_at, is_paid, status, no_nights, full_name, email, extra_price",
      )
      .gte("created_at", startDate.toISOString())
      .lte("created_at", today.toISOString())
      .throwOnError();

    return z.array(StatisticsBookingSchema).parse(data);
  } catch (error) {
    console.error(error);
    throw Error("Error fetching bookings from last N days");
  }
}

type GetStaysFromLastNDaysArgs = {
  n: number;
};

export async function getStaysFromLastNDays({
  n: lastNDays,
}: GetStaysFromLastNDaysArgs) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - lastNDays);

  try {
    const [stays, noCabins] = await Promise.all([
      APIClient.from("bookings")
        .select(
          "id, start_date, end_date, total_due, created_at, is_paid, status, no_nights, full_name, email, extra_price",
        )
        .or("status.eq.checked in, status.eq.checked out")
        .gte("start_date", startDate.toISOString())
        .lte("start_date", today.toISOString())
        .throwOnError(),
      APIClient.from("cabins")
        .select("*", {
          count: "exact",
          head: true,
        })
        .throwOnError(),
    ]);

    return {
      stays: z.array(StatisticsBookingSchema).parse(stays.data),
      noCabins: noCabins.count,
    };
  } catch (error) {
    console.error(error);
    throw Error("Error fetching stays from last N days");
  }
}

export async function getTodayBookingActivities() {
  const today = new Date().toISOString();

  try {
    const { data } = await APIClient.from("bookings")
      .select("id, status, no_guests, full_name, email")
      .or(
        `and(status.eq.checked in, start_date.eq.${today}), and(status.eq.checked out, end_date.eq.${today})`,
      )
      .throwOnError();

    return z.array(BookingActivitySchema).parse(data);
  } catch (error) {
    console.error(error);
    throw Error("Error fetching today's booking activities");
  }
}
