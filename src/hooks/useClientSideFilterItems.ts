import { useSearchParams } from "react-router-dom";

interface UseClientSideFilterItemsProps<T> {
  items: T[];
  filterField: string;
  filter: Record<string, (i: T) => boolean>;
}

export function useClientSideFilterItems<T>({
  items,
  filter,
  filterField,
}: UseClientSideFilterItemsProps<T>) {
  const [searchParams] = useSearchParams();
  const filterParams = searchParams.get(filterField);

  if (!filterParams) {
    return items;
  }

  if (filterParams in filter) {
    const filterFn = filter[filterParams];

    return items.slice().filter(filterFn);
  }

  return items;
}
