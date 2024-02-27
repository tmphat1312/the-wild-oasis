import { QUERY_KEYS } from "@/lib/constants";
import { BookingValues } from "@/schemas/bookingSchema";
import { getBooking } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

interface UseBookingArgs {
  bookingId: BookingValues["id"];
}

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
