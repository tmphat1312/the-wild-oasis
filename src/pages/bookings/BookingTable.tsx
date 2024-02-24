import ErrorMessage from "@/components/ui/ErrorMessage";
import { Pagination } from "@/components/ui/Pagination";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { HeaderColumn } from "@/components/ui/table/HeaderColumn";
import { Table } from "@/components/ui/table/Table";
import { TableBody } from "@/components/ui/table/TableBody";
import { TableHeader } from "@/components/ui/table/TableHeader";
import { BookingTableRow } from "./BookingTableRow";
import { useBookings } from "./useBookings";

export function BookingTable() {
  const { isLoading, error, bookings, count } = useBookings();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-2">
      <Table aria-label="Cabins">
        <TableHeader>
          <HeaderColumn isRowHeader>Cabin</HeaderColumn>
          <HeaderColumn>Guest</HeaderColumn>
          <HeaderColumn>Dates</HeaderColumn>
          <HeaderColumn>Status</HeaderColumn>
          <HeaderColumn>Amount</HeaderColumn>
          <HeaderColumn />
        </TableHeader>

        <TableBody items={bookings} renderEmptyState={() => "no results"}>
          {(row) => <BookingTableRow row={row} />}
        </TableBody>
      </Table>
      <Pagination count={count} />
    </div>
  );
}