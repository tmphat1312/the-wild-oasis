import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { Column } from "@/components/ui/table/Column";
import { Table } from "@/components/ui/table/Table";
import { TableBody } from "@/components/ui/table/TableBody";
import { TableHeader } from "@/components/ui/table/TableHeader";
import { useClientSideFilterItems } from "@/hooks/useClientSideFilterItems";
import { useClientSideSortItems } from "@/hooks/useClientSideSortItems";
import { CabinType } from "@/schemas/CabinSchema";
import { CabinTableRow } from "./CabinTableRow";
import { useCabins } from "./useCabins";
import { Empty } from "@/components/ui/Empty";

export function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const filteredItems = useClientSideFilterItems<CabinType>({
    items: cabins ?? [],
    filterField: "discount",
    filter: {
      with_discount: (i) => !!i.discount && i.discount > 0,
      without_discount: (i) => !i.discount,
    },
  });
  const sortedItems = useClientSideSortItems<CabinType>({
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
        <Column>Showcase</Column>
        <Column>Cabin</Column>
        <Column>Capacity</Column>
        <Column>Price</Column>
        <Column>Discount</Column>
        <Column aria-label="Row actions" />
      </TableHeader>
      <TableBody
        items={sortedItems}
        renderEmpty={() => <Empty>No items found</Empty>}
        renderRow={(item) => <CabinTableRow row={item} key={item.id} />}
      />
    </Table>
  );
}
