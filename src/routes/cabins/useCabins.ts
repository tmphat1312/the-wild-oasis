import { QUERY_KEYS } from "@/lib/constants";
import { getCabins } from "@/services/APICabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  return useQuery({
    queryKey: [QUERY_KEYS.cabins],
    queryFn: getCabins,
  });
}
