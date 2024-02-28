import {
  BookingIcon,
  CheckInIcon,
  CheckOutIcon,
  CurrencyIcon,
} from "@/components/Icons";
import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import { StatisticsBookingValues } from "@/schemas/bookingSchema";
import { DashboardBox } from "./DashboardBox";

type BookingStatisticsProps = {
  bookings: StatisticsBookingValues[];
};

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
      <DashboardBox>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div
            role="presentation"
            className="flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-700"
          >
            <BookingIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Bookings</div>
            <div className="text-lg">{statistics.noBookings}</div>
          </div>
        </div>
      </DashboardBox>
      <DashboardBox>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div
            role="presentation"
            className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-700"
          >
            <CurrencyIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Sales</div>
            <div className="text-lg">
              <CurrencyPresenter amount={statistics.totalSales} />
            </div>
          </div>
        </div>
      </DashboardBox>
      <DashboardBox>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div
            role="presentation"
            className="flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-700"
          >
            <CheckInIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Check ins</div>
            <div className="text-lg">{statistics.noCheckIns}</div>
          </div>
        </div>
      </DashboardBox>
      <DashboardBox>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div
            role="presentation"
            className="flex size-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700"
          >
            <CheckOutIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Check outs</div>
            <div className="text-lg">{statistics.noCheckOuts}</div>
          </div>
        </div>
      </DashboardBox>
    </div>
  );
}
