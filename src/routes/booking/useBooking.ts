import { QUERY_KEYS } from "@/lib/constants";
import { BookingType } from "@/schemas/BookingSchema";
import { getBooking } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

type UseBookingArgs = {
  bookingId: BookingType["id"];
};

export function useBooking({ bookingId }: UseBookingArgs) {
  const { isLoading, error, data } = useQuery({
    queryKey: [QUERY_KEYS.bookings, bookingId],
    queryFn: () => getBooking({ bookingId }),
  });

  return {
    isLoading,
    error,
    booking: data,
  };
}
