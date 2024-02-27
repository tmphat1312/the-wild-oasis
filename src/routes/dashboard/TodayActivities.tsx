import { DashboardBox } from "./DashboardBox";
import { useTodayActivities } from "./useTodayActivities";

export function TodayActivities() {
  const { isLoading, error, todayActivities } = useTodayActivities();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todayActivities) {
    return <div>No activities today</div>;
  }

  // if (todayActivities.length === 0) {
  //   return (
  //     <DashboardBox>
  //       <div>No activities today</div>
  //     </DashboardBox>
  //   );
  // }

  return (
    <DashboardBox>
      <div className="mb-4 text-lg font-medium">Today</div>
      <ul className="divide-y border-y">
        {OLDdata.map((activity) => (
          <li
            key={activity.id}
            className="grid grid-cols-[90px_1fr_90px] items-center gap-4 py-1.5"
          >
            {activity.status == "checked-in" ? (
              <>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-center text-xs font-semibold uppercase text-blue-700 ">
                  departing
                </span>
                <span className="text-sm font-medium">
                  {activity.guests.fullName} + 3 guests
                </span>
                <button className="rounded-md bg-brand-700 px-2 py-1 text-sm text-brand-50">
                  check out
                </button>
              </>
            ) : (
              <>
                <span className="rounded-full bg-green-100 px-2 py-1 text-center text-xs font-medium uppercase text-green-700">
                  arriving
                </span>
                <span className="text-sm font-medium">
                  {activity.guests.fullName} + 3 guests
                </span>
                <button className="rounded-md bg-brand-700 px-2 py-1 text-sm text-brand-50">
                  check in
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </DashboardBox>
  );
}
const OLDdata = [
  {
    id: 1,
    status: "unconfirmed",
    guests: { fullName: "Jonas Schmedtmann" },
    numNights: 6,
  },
  {
    id: 2,
    status: "unconfirmed",
    guests: { fullName: "Steven Miller" },
    numNights: 1,
  },
  {
    id: 3,
    status: "checked-in",
    guests: { fullName: "John Smith" },
    numNights: 3,
  },
  {
    id: 4,
    status: "unconfirmed",
    guests: { fullName: "Marta Schmedtmann" },
    numNights: 14,
  },
  {
    id: 5,
    status: "checked-in",
    guests: { fullName: "Miguel Silva" },
    numNights: 5,
  },
  {
    id: 6,
    status: "checked-in",
    guests: { fullName: "Mary Williams" },
    numNights: 4,
  },
];
