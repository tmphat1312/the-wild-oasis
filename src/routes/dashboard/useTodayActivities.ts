import { QUERY_KEYS } from "@/lib/constants";
import { getTodayBookingActivities } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivities() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.todayActivities],
    queryFn: getTodayBookingActivities,
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    todayActivities: query.data,
  };
}
