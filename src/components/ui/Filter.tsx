import { useSearchParams } from "react-router-dom";
// import styled, { css } from "styled-components";

// const StyledFilter = styled.div`
//   border: 1px solid var(--color-grey-100);
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-sm);
//   border-radius: var(--border-radius-sm);
//   padding: 0.4rem;
//   display: flex;
//   gap: 0.4rem;
// `;

// const FilterButton = styled.button`
//   background-color: var(--color-grey-0);
//   border: none;

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;
//   /* To give the same height as select */
//   padding: 0.44rem 0.8rem;
//   transition: all 0.3s;

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

interface FilterProps {
  filterField: string;
  options: { value: string; label: string }[];
}

export function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || "";
  const currentPage = searchParams.get("page");

  function handleSetFilter(value: string) {
    if (value === currentFilter) return;

    if (currentPage) {
      searchParams.delete("page");
    }

    if (value == "") {
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
