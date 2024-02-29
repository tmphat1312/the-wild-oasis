import { useSearchParams } from "react-router-dom";

type SortDirection = "asc" | "desc";

type UseClientSideSortItemsProps<T> = {
  items: T[];
  sort: Record<string, (a: T, b: T) => number>;
};

function isSortDirection(direction: string): direction is SortDirection {
  return direction === "asc" || direction === "desc";
}

export function useClientSideSortItems<T>({
  items,
  sort,
}: UseClientSideSortItemsProps<T>) {
  const [searchParams] = useSearchParams();
  const sortParams = searchParams.get("sortBy");

  if (!sortParams) {
    return items;
  }

  const [key, direction] = sortParams.split("-");

  if (key in sort && isSortDirection(direction)) {
    const comp = sort[key];
    const sortedItems = items.slice().sort(comp);

    if (direction === "desc") {
      sortedItems.reverse();
    }

    return sortedItems;
  }

  return items;
}
