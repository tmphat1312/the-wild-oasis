import { queryKeys } from "@/constants/query-keys";
import { useFilterField } from "@/hooks/useFilterField";
import { usePagination } from "@/hooks/usePagination";
import { useSortField } from "@/hooks/useSortField";
import { getBookings } from "@/services/APIBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const filterOption = useFilterField({
    filterField: "status",
    formatValue: (value) => value.toLowerCase().replace(/-/g, " "),
  });
  const sortOption = useSortField({
    sortFields: ["start_date", "total_due"],
  });
  const page = usePagination();

  const {
    isLoading,
    error,
    data = { bookings: [], count: 0 },
  } = useQuery({
    queryKey: [...queryKeys.bookings, filterOption, sortOption, page],
    queryFn: () =>
      getBookings({ filterOptions: [filterOption], sortOption, page }),
  });

  return { isLoading, error, bookings: data.bookings, count: data.count };
}
