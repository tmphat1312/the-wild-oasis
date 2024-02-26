import { getBookingFromLastNDays } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useStatisticsBookings() {
  const [searchParams] = useSearchParams();
  const lastNDays = searchParams.get("lastNDays") || "7";

  const query = useQuery({
    queryKey: ["bookings", "statistics", lastNDays],
    queryFn: () => getBookingFromLastNDays({ n: Number(lastNDays) }),
  });

  return {
    isLoading: query.isLoading,
    bookings: query.data,
    error: query.error,
  };
}
