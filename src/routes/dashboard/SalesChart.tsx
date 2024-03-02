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

type SalesChartProps = {
  howManyDays: number;
  bookings: StatisticsBookingType[];
};

export function SalesChart({ howManyDays, bookings }: SalesChartProps) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - howManyDays);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), howManyDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: 0,
      extraSales: 0,
    };
  });

  bookings.forEach((booking) => {
    const date = new Date(booking.created_at);
    const dateIndex = allDates.findIndex((d) => isSameDay(d, date));
    if (dateIndex === -1) return;

    data[dateIndex] = {
      label: format(date, "MMM dd"),
      totalSales: 0,
      extraSales: 0,
    };

    if (booking.is_paid) {
      data[dateIndex].totalSales += booking.total_due;
      data[dateIndex].extraSales += booking.extra_price;
    }
  });

  return (
    <DashboardBox>
      <div className="mb-4 text-lg font-semibold">
        Sales&nbsp;
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
            style={{
              fontSize: "0.85rem",
            }}
            tickFormatter={(value) => {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(value);
            }}
          />
          <CartesianGrid strokeDasharray="2" />
          <Tooltip />
          <Area
            dataKey="totalSales"
            type="monotone"
            name="Total sales"
            unit="$"
            stroke="#15803d"
            fill="#15803d"
          />
          <Area
            dataKey="extraSales"
            type="natural"
            name="Extra sales"
            unit="$"
            stroke="#f97316"
            fill="#f97316"
          />
          <Legend verticalAlign="top" height={36} />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
