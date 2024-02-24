import { useSearchParams } from "react-router-dom";

export function usePagination() {
  const [searchParams] = useSearchParams();

  return Number(searchParams.get("page") ?? 1);
}
