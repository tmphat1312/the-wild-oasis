import { BookingStatistics } from "./BookingStatistics";
import { DashboardBox } from "./DashboardBox";
import { SalesChart } from "./SalesChart";
import { useStatisticsBookings } from "./useStatisticsBookings";

export function DashboardLayout() {
  const { isLoading, bookings, error, lastNDays } = useStatisticsBookings();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bookings) {
    return <div>No bookings found</div>;
  }

  return (
    <div className="grid gap-4">
      <BookingStatistics bookings={bookings} />
      <div className="col-span-full grid grid-cols-2 gap-[inherit]">
        <DashboardBox>today activities</DashboardBox>
        <DashboardBox>stay chart</DashboardBox>
      </div>
      <SalesChart howManyDays={lastNDays} bookings={bookings} />
    </div>
  );
}
