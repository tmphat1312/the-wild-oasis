import { getStaysFromLastNDays } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function useStatisticsStays() {
  const [searchParams] = useSearchParams();
  const lastNDays = searchParams.get("last") || "7";

  const query = useQuery({
    queryKey: ["stays", "statistics", lastNDays],
    queryFn: () => getStaysFromLastNDays({ n: Number(lastNDays) }),
  });

  return {
    isLoading: query.isLoading,
    stays: query.data,
    error: query.error,
  };
}
