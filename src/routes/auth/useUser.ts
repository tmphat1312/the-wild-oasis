import { queryKeys } from "@/constants/query-keys";
import { getCurrentUser } from "@/services/APIAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const query = useQuery({
    queryKey: queryKeys.user,
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
