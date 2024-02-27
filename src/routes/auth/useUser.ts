import { QUERY_KEYS } from "@/lib/constants";
import { getCurrentUser } from "@/services/APIAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: getCurrentUser,
    retry: false,
  });

  const user = query.data;
  return {
    isLoading: query.isLoading,
    isAuthenticated: !query.error && user && user.role == "authenticated",
    user,
  };
}
