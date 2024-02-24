import { FilterFieldOption } from "@/types/API";
import { useSearchParams } from "react-router-dom";

interface UseFilterFieldArgs {
  filterField: FilterFieldOption["field"];
  formatValue?: (value: string) => FilterFieldOption["value"];
}

export function useFilterField({
  filterField,
  formatValue = (value) => value,
}: UseFilterFieldArgs): FilterFieldOption {
  const [searchParams] = useSearchParams();

  const value = searchParams.get(filterField) ?? "";

  return {
    field: filterField,
    value: formatValue(value),
  };
}
