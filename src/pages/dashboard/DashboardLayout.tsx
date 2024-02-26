import { BookingStatistics } from "./BookingStatistics";
import { DashboardBox } from "./DashboardBox";
import { useStatisticsBookings } from "./useStatisticsBookings";

export function DashboardLayout() {
  const { isLoading, bookings } = useStatisticsBookings();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!bookings) {
    return <div>No bookings found</div>;
  }

  console.log(bookings);

  return (
    <div className="grid gap-4">
      <BookingStatistics bookings={bookings} />
      <div className="col-span-full grid grid-cols-2 gap-[inherit]">
        <DashboardBox>today activities</DashboardBox>
        <DashboardBox>stay chart</DashboardBox>
      </div>
      <div>
        <DashboardBox>profit chart</DashboardBox>
      </div>
    </div>
  );
}
