import ErrorMessage from "@/components/ui/ErrorMessage";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { HeaderColumn } from "@/components/ui/table/HeaderColumn";
import { Table } from "@/components/ui/table/Table";
import { TableBody } from "@/components/ui/table/TableBody";
import { TableHeader } from "@/components/ui/table/TableHeader";
import { CabinTableRow } from "./CabinTableRow";
import { useCabins } from "./useCabins";

export default function CabinTable() {
  const { isLoading, error, data } = useCabins();

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
      <TableBody items={data} renderEmptyState={() => "no results"}>
        {(row) => <CabinTableRow row={row} />}
      </TableBody>
    </Table>
  );
}
