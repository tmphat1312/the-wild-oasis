import { ITEMS_PER_PAGE } from "@/constants/API";
import { queryKeys } from "@/constants/query-keys";
import { useFilterField } from "@/hooks/useFilterField";
import { usePagination } from "@/hooks/usePagination";
import { useSortField } from "@/hooks/useSortField";
import { getBookings } from "@/services/APIBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // PREFETCH
  const noPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  if (noPages > 1) {
    const nextPage = Math.min(page + 1, noPages);

    queryClient.prefetchQuery({
      queryKey: [...queryKeys.bookings, filterOption, sortOption, nextPage],
      queryFn: () =>
        getBookings({
          filterOptions: [filterOption],
          sortOption,
          page: nextPage,
        }),
    });
  }

  if (page < noPages) {
    const prevPage = Math.max(page - 1, 1);

    queryClient.prefetchQuery({
      queryKey: [...queryKeys.bookings, filterOption, sortOption, prevPage],
      queryFn: () =>
        getBookings({
          filterOptions: [filterOption],
          sortOption,
          page: prevPage,
        }),
    });
  }

  return { isLoading, error, bookings: data.bookings, count: data.count };
}
