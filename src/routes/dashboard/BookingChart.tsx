import { DatePresenter } from "@/components/presenters/DatePresenter";
import { StatisticsBookingType } from "@/schemas/BookingSchema";
import { DashboardBox } from "./DashboardBox";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  howManyDays: number;
  bookings: StatisticsBookingType[];
};

export function BookingChart({ howManyDays, bookings }: Props) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - howManyDays);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), howManyDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    noBookings: 0,
  }));

  bookings.forEach((booking) => {
    const date = new Date(booking.created_at);
    const dateIndex = allDates.findIndex((d) => isSameDay(d, date));

    if (dateIndex !== -1) {
      data[dateIndex].noBookings += 1;
    }
  });

  return (
    <DashboardBox>
      <div className="mb-4 text-lg font-semibold">
        Number of bookings&nbsp;
        <span>
          from <DatePresenter date={startDate} />
          &nbsp;
        </span>
        <span>
          to <DatePresenter date={today} />
          &nbsp;
        </span>
      </div>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            style={{
              fontSize: "0.85rem",
            }}
            dataKey="label"
          />
          <YAxis
            allowDecimals={false}
            style={{
              fontSize: "0.85rem",
            }}
          />
          <CartesianGrid strokeDasharray="2" />
          <Tooltip />
          <Area
            dataKey="noBookings"
            type="monotone"
            name="Number of bookings"
            stroke="#3b82f6"
            fill="#3b82f6"
          />
          <Legend verticalAlign="top" height={36} />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
