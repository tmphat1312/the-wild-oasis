import ErrorMessage from "@/components/ui/ErrorMessage";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { HeaderColumn } from "@/components/ui/table/HeaderColumn";
import { Table } from "@/components/ui/table/Table";
import { TableBody } from "@/components/ui/table/TableBody";
import { TableHeader } from "@/components/ui/table/TableHeader";
import { CabinTableRow } from "./CabinTableRow";
import { useCabins } from "./useCabins";
import { useClientSideSortItems } from "@/hooks/useClientSideSortItems";
import { CabinValues } from "@/schemas/cabinSchema";
import { useClientSideFilterItems } from "@/hooks/useClientSideFilterItems";

export default function CabinTable() {
  const { isLoading, error, data } = useCabins();
  const filteredItems = useClientSideFilterItems<CabinValues>({
    items: data ?? [],
    filterField: "discount",
    filter: {
      with_discount: (i) => i.discount > 0,
      without_discount: (i) => !i.discount,
    },
  });
  const sortedItems = useClientSideSortItems<CabinValues>({
    items: filteredItems ?? [],
    sort: {
      name: (a, b) => a.name.localeCompare(b.name),
      regular_price: (a, b) => a.regular_price - b.regular_price,
      max_capacity: (a, b) => a.max_capacity - b.max_capacity,
    },
  });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <Table aria-label="Cabins">
      <TableHeader>
        <HeaderColumn isRowHeader>Showcase</HeaderColumn>
        <HeaderColumn>Cabin</HeaderColumn>
        <HeaderColumn>Capacity</HeaderColumn>
        <HeaderColumn>Price</HeaderColumn>
        <HeaderColumn>Discount</HeaderColumn>
        <HeaderColumn />
      </TableHeader>
      <TableBody items={sortedItems} renderEmptyState={() => "no results"}>
        {(row) => <CabinTableRow row={row} />}
      </TableBody>
    </Table>
  );
}
