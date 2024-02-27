import { QUERY_KEYS } from "@/lib/constants";
import { getSettings } from "@/services/APISettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  return useQuery({
    queryKey: [QUERY_KEYS.settings],
    queryFn: getSettings,
  });
}
