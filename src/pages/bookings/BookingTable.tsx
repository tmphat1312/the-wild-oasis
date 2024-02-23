import ErrorMessage from "@/components/ui/ErrorMessage";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { HeaderColumn } from "@/components/ui/table/HeaderColumn";
import { Table } from "@/components/ui/table/Table";
import { TableHeader } from "@/components/ui/table/TableHeader";
import { useBookings } from "./useBookings";

export function BookingTable() {
  const { isLoading, error, bookings } = useBookings();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  console.log(bookings);

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
    </Table>
  );
}
