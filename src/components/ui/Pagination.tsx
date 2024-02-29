import { ITEMS_PER_PAGE } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  count: number;
};

export function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const noPages = Math.ceil(count / ITEMS_PER_PAGE);
  const from = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, count);

  function goToNextPage() {
    const next = Math.min(currentPage + 1, noPages);
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function goToPrevPage() {
    const prev = Math.max(currentPage - 1, 1);
    searchParams.set("page", prev.toString());

    if (prev === 1) {
      searchParams.delete("page");
    }

    setSearchParams(searchParams);
  }

  if (noPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-md border bg-background px-6 py-2.5 text-sm shadow">
      <div>
        Showing
        <span className="font-medium">&nbsp;{from}&nbsp;</span> to
        <span className="font-medium">&nbsp;{to}&nbsp;</span>
        of
        <span className="font-medium">&nbsp;{count}&nbsp;</span>
        results
      </div>
      <div className="flex items-center gap-1">
        <button
          className="inline-flex items-center gap-1 rounded px-2 py-1.5 font-medium capitalize hover:bg-brand-500 hover:text-brand-50 disabled:pointer-events-none disabled:opacity-50"
          disabled={currentPage == 1}
          onClick={goToPrevPage}
        >
          <ChevronLeftIcon role="presentation" size={18} />
          previous
        </button>
        <button
          className="inline-flex items-center gap-1 rounded px-2 py-1.5 font-medium capitalize hover:bg-brand-500 hover:text-brand-50 disabled:pointer-events-none disabled:opacity-50"
          disabled={currentPage == noPages}
          onClick={goToNextPage}
        >
          next
          <ChevronRightIcon role="presentation" size={18} />
        </button>
      </div>
    </div>
  );
}
