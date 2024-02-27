import { SortFieldOption } from "@/types/API";
import { useSearchParams } from "react-router-dom";

type SortFieldOptionArgs = {
  sortFields: string[];
};

export function useSortField({
  sortFields,
}: SortFieldOptionArgs): SortFieldOption {
  const [searchParams] = useSearchParams();
  const sortFieldSet = new Set(sortFields);

  const sortField = searchParams.get("sortBy") || "";
  const [field, order] = sortField.split("-");

  if (sortFieldSet.has(field)) {
    return {
      field,
      order: {
        ascending: order === "asc",
      },
    };
  }

  return {
    field: "",
    order: {
      ascending: true,
    },
  };
}
