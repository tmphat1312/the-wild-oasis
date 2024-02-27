import { queryKeys } from "@/constants/query-keys";
import { getSettings } from "@/services/APISettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: getSettings,
  });
}
