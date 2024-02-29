import { QUERY_KEYS } from "@/lib/constants";
import { getSettings } from "@/services/APISettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.settings],
    queryFn: getSettings,
  });

  return {
    isLoading: query.isLoading,
    settings: query.data,
    error: query.error,
  };
}
