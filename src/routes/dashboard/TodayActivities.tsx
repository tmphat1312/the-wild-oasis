import { Skeleton } from "@/components/ui/Skeleton";
import { BookingActivityType } from "@/schemas/BookingSchema";
import { Link } from "react-router-dom";
import { useCheckoutBooking } from "../bookings/useCheckoutBooking";
import { DashboardBox } from "./DashboardBox";
import { useTodayActivities } from "./useTodayActivities";

function Activity({ activity }: { activity: BookingActivityType }) {
  const { isCheckingOut, checkoutBooking } = useCheckoutBooking({
    bookingId: activity.id,
  });

  function handleCheckOut() {
    checkoutBooking();
  }

  return (
    <li className="grid grid-cols-[90px_1fr_90px] items-center gap-4 py-1.5">
      {activity.status === "unconfirmed" ? (
        <span className="rounded-full bg-green-100 px-2 py-1 text-center text-xs font-semibold uppercase text-green-700 ">
          arriving
        </span>
      ) : (
        <span className="rounded-full bg-blue-100 px-2 py-1 text-center text-xs font-semibold uppercase text-blue-700 ">
          departing
        </span>
      )}
      <span className="text-sm font-medium">
        {activity.full_name} + 3 guests
      </span>
      {activity.status === "unconfirmed" ? (
        <Link
          to={`/check-in/${activity.id}`}
          className="rounded-md bg-brand-700 px-2 py-1 text-center text-xs uppercase text-brand-50"
        >
          check in
        </Link>
      ) : (
        <button
          className="rounded-md bg-brand-700 px-2 py-1 text-xs uppercase text-brand-50 disabled:pointer-events-none disabled:grayscale"
          onClick={handleCheckOut}
          disabled={isCheckingOut}
        >
          check out
        </button>
      )}
    </li>
  );
}

export function TodayActivities() {
  const { isLoading, error, todayActivities = [] } = useTodayActivities();

  if (error) {
    return (
      <DashboardBox>
        <div className="mb-4 text-lg font-semibold">
          Error loading today activities 😢
        </div>
      </DashboardBox>
    );
  }

  if (isLoading) {
    return (
      <DashboardBox>
        <Skeleton className="h-full" />
      </DashboardBox>
    );
  }

  if (todayActivities.length === 0) {
    return (
      <DashboardBox>
        <div className="mb-4 text-lg font-semibold">No activities today</div>
      </DashboardBox>
    );
  }

  return (
    <DashboardBox>
      <div className="mb-4 text-lg font-semibold">Today</div>
      <ul className="-mr-2 max-h-[240px] divide-y overflow-y-auto border-y pr-2">
        {todayActivities.map((activity) => (
          <Activity activity={activity} key={activity.id} />
        ))}
      </ul>
    </DashboardBox>
  );
}
