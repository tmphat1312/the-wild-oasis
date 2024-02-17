import { queryKeys } from "@/constants/query-keys";
import { getCabins } from "@/services/APICabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  return useQuery({
    queryKey: queryKeys.cabins,
    queryFn: getCabins,
  });
}
