import { Empty } from "@/components/ui/Empty";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Pagination } from "@/components/ui/Pagination";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { Column } from "@/components/ui/table/Column";
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
          <Column>Cabin</Column>
          <Column>Guest</Column>
          <Column>Dates</Column>
          <Column>Status</Column>
          <Column>Amount</Column>
          <Column />
        </TableHeader>

        <TableBody
          items={bookings}
          renderEmpty={() => <Empty>No bookings found</Empty>}
          renderRow={(booking) => (
            <BookingTableRow row={booking} key={booking.id} />
          )}
        />
      </Table>
      <Pagination count={count} />
    </div>
  );
}
