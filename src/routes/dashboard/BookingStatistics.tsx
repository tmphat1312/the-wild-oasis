import {
  BookingIcon,
  CurrencyIcon,
  OccupationRateIcon,
} from "@/components/Icons";
import { CurrencyPresenter } from "@/components/presenters/CurrencyPresenter";
import { StatisticsBookingType } from "@/schemas/BookingSchema";
import { DashboardBox } from "./DashboardBox";

type BookingStatisticsProps = {
  bookings: StatisticsBookingType[];
  noCabins: number;
  howManyDays: number;
};

function calculateStatistics(
  bookings: StatisticsBookingType[],
  noCabins: number,
  howManyDays: number,
) {
  const noBookings = bookings.length;
  let totalSales = 0;
  let extraSales = 0;
  let totalNights = 0;

  for (const booking of bookings) {
    totalSales += booking.total_due;
    extraSales += booking.extra_price;
    totalNights += booking.no_nights;
  }

  const occupancyRate = (
    (totalNights / (noCabins * howManyDays)) *
    100
  ).toFixed(2);

  return {
    noBookings,
    totalSales,
    extraSales,
    occupancyRate,
  };
}

export function BookingStatistics({
  bookings,
  noCabins,
  howManyDays,
}: BookingStatisticsProps) {
  const statistics = calculateStatistics(bookings, noCabins, howManyDays);

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
            <div className="text-xs uppercase">Total Bookings</div>
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
            <div className="text-xs uppercase">Booking Sales</div>
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
            <CurrencyIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Extra sales</div>
            <div className="text-lg">
              <CurrencyPresenter amount={statistics.extraSales} />
            </div>
          </div>
        </div>
      </DashboardBox>
      <DashboardBox>
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div
            role="presentation"
            className="flex size-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-700"
          >
            <OccupationRateIcon size={22} />
          </div>
          <div className="font-medium">
            <div className="text-xs uppercase">Occupancy rate</div>
            <div className="text-lg">{statistics.occupancyRate}%</div>
          </div>
        </div>
      </DashboardBox>
    </div>
  );
}
