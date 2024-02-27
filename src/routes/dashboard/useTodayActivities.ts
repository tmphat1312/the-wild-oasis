import { getTodayBookingActivities } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivities() {
  const query = useQuery({
    queryKey: ["todayActivities"],
    queryFn: getTodayBookingActivities,
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    todayActivities: query.data,
  };
}
