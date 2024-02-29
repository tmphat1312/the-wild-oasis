import { useSearchParams } from "react-router-dom";

type FilterProps = {
  filterField: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
};

export function Filter({
  filterField,
  defaultValue = "",
  options,
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || defaultValue;
  const currentPage = searchParams.get("page");

  function handleSetFilter(value: string) {
    if (value === currentFilter) return;

    if (currentPage) {
      searchParams.delete("page");
    }

    if (value == defaultValue) {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="flex items-center gap-1 rounded-md border bg-background p-1 shadow">
      {options.map((option) => (
        <button
          className="rounded-md bg-background px-2 py-1 text-sm font-medium hover:bg-brand-500 hover:text-brand-50
          disabled:cursor-default data-[active=true]:bg-brand-600 data-[active=true]:text-brand-50
          "
          data-active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          key={option.value}
          onClick={() => handleSetFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
