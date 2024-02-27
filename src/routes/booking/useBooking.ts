import { queryKeys } from "@/constants/query-keys";
import { BookingValues } from "@/schemas/bookingSchema";
import { getBooking } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

interface UseBookingArgs {
  bookingId: BookingValues["id"];
}

export function useBooking({ bookingId }: UseBookingArgs) {
  const { isLoading, error, data } = useQuery({
    queryKey: queryKeys.booking(bookingId),
    queryFn: () => getBooking({ bookingId }),
  });

  return {
    isLoading,
    error,
    booking: data,
  };
}
