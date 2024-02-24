import { queryKeys } from "@/constants/query-keys";
import { useFilterField } from "@/hooks/useFilterField";
import { getBookings } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const filterOption = useFilterField({
    filterField: "status",
    formatValue: (value) => value.toLowerCase().replace(/-/g, " "),
  });

  const {
    isLoading,
    error,
    data = { bookings: [], count: 0 },
  } = useQuery({
    queryKey: [...queryKeys.bookings, filterOption],
    queryFn: () => getBookings({ filterOptions: [filterOption] }),
  });

  return { isLoading, error, bookings: data.bookings, count: data.count };
}
