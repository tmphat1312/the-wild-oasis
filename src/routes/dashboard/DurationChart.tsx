import { StatisticsBookingValues } from "@/schemas/bookingSchema";
import { DashboardBox } from "./DashboardBox";
import {
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Legend,
} from "recharts";

type DurationChartProps = {
  stays: StatisticsBookingValues[];
};

export function DurationChart({ stays }: DurationChartProps) {
  const piePortions: {
    durationLabel: string;
    duration: [number, number];
    value: number;
    color: `#${string}`;
  }[] = [
    {
      durationLabel: "1 night",
      duration: [1, 1],
      value: 0,
      color: "#ef4444",
    },
    {
      durationLabel: "2 nights",
      duration: [2, 2],
      value: 0,
      color: "#f97316",
    },
    {
      durationLabel: "3 nights",
      duration: [3, 3],
      value: 0,
      color: "#eab308",
    },
    {
      durationLabel: "4-5 nights",
      duration: [4, 5],
      value: 0,
      color: "#84cc16",
    },
    {
      durationLabel: "6-7 nights",
      duration: [6, 7],
      value: 0,
      color: "#22c55e",
    },
    {
      durationLabel: "8-14 nights",
      duration: [8, 14],
      value: 0,
      color: "#14b8a6",
    },
    {
      durationLabel: "15-21 nights",
      duration: [15, 21],
      value: 0,
      color: "#3b82f6",
    },
    {
      durationLabel: "21+ nights",
      duration: [21, -1],
      value: 0,
      color: "#a855f7",
    },
  ];

  stays.forEach((stay) => {
    const duration = stay.no_nights;

    const piePortion = piePortions.find((portion) => {
      const [min, max] = portion.duration;

      return duration >= min && (max === -1 || duration <= max);
    });

    if (piePortion) {
      piePortion.value += 1;
    }
  });
  const data = piePortions.filter((portion) => portion.value > 0);

  return (
    <DashboardBox>
      <div className="mb-4 text-lg font-semibold">Stay duration summary</div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="durationLabel"
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                key={entry.durationLabel}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            width={120}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
