import { QUERY_KEYS } from "@/lib/constants";
import { getCabins } from "@/services/APICabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.cabins],
    queryFn: getCabins,
  });

  return {
    isLoading: query.isLoading,
    error: query.error,
    cabins: query.data,
  };
}
