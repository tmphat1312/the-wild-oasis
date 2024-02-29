import { getBookingsFromLastNDays } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useStatisticsBookings() {
  const [searchParams] = useSearchParams();
  const lastNDays = searchParams.get("last") || "7";

  const query = useQuery({
    queryKey: ["bookings", "statistics", lastNDays],
    queryFn: () => getBookingsFromLastNDays({ n: Number(lastNDays) }),
  });

  return {
    isLoading: query.isLoading,
    bookings: query.data,
    error: query.error,
    lastNDays: Number(lastNDays),
  };
}
