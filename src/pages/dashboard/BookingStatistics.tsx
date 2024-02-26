import { StatisticsBookingValues } from "@/schemas/bookingSchema";
import { DashboardBox } from "./DashboardBox";

interface BookingStatisticsProps {
  bookings: StatisticsBookingValues[];
}

function calculateStatistics(bookings: StatisticsBookingValues[]) {
  const noBookings = bookings.length;
  let noCheckIns = 0;
  let noCheckOuts = 0;
  let totalSales = 0;

  for (const booking of bookings) {
    if (booking.status === "checked in") {
      noCheckIns++;
    } else if (booking.status === "checked out") {
      noCheckOuts++;
    }

    totalSales += booking.total_due;
  }

  return {
    noBookings,
    totalSales,
    noCheckIns,
    noCheckOuts,
  };
}

export function BookingStatistics({ bookings }: BookingStatisticsProps) {
  const statistics = calculateStatistics(bookings);

  return (
    <div className="grid grid-cols-4 gap-[inherit]">
      <DashboardBox>{statistics.noBookings}</DashboardBox>
      <DashboardBox>{statistics.totalSales}</DashboardBox>
      <DashboardBox>{statistics.noCheckIns}</DashboardBox>
      <DashboardBox>{statistics.noCheckOuts}</DashboardBox>
    </div>
  );
}
