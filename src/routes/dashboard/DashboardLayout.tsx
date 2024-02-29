import { BookingStatistics } from "./BookingStatistics";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DurationChart } from "./DurationChart";
import { SalesChart } from "./SalesChart";
import { TodayActivities } from "./TodayActivities";
import { useStatisticsBookings } from "./useStatisticsBookings";
import { useStatisticsStays } from "./useStatisticsStays";

export function DashboardLayout() {
  const {
    isLoading: isBookingsLoading,
    bookings,
    error: bookingsError,
    lastNDays: lastNDaysBookings,
  } = useStatisticsBookings();
  const {
    isLoading: isStaysLoading,
    stays,
    error: staysError,
  } = useStatisticsStays();
  const error = bookingsError || staysError;
  const isLoading = isBookingsLoading || isStaysLoading;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!bookings || !stays) {
    return <div>No bookings found</div>;
  }

  return (
    <div className="grid gap-4">
      <BookingStatistics bookings={bookings} />
      <div className="col-span-full grid grid-cols-2 gap-[inherit]">
        <TodayActivities />
        <DurationChart stays={stays} />
      </div>
      <SalesChart howManyDays={lastNDaysBookings} bookings={bookings} />
    </div>
  );
}
