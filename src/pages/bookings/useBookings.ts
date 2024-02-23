import { queryKeys } from "@/constants/query-keys";
import { getBookings } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const {
    isLoading,
    error,
    data = { bookings: [], count: 0 },
  } = useQuery({
    queryKey: queryKeys.bookings,
    queryFn: getBookings,
  });

  return { isLoading, error, bookings: data.bookings, count: data.count };
}
