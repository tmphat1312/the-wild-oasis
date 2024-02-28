import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import { DateDistancePresenter } from "@/components/presenters/DateDistancePresenter";
import { DatePresenter } from "@/components/presenters/DatePresenter";
import { classnames } from "@/lib/classnames";
import { BookingDetailValues } from "@/schemas/bookingSchema";
import {
  CircleDollarSign,
  MessageSquareWarning,
  Minus,
  Sandwich,
  Warehouse,
} from "lucide-react";
import pluralize from "pluralize";

type BookingDetailCardProps = {
  booking: BookingDetailValues;
};

export function BookingDetailCard({ booking }: BookingDetailCardProps) {
  return (
    <div className="overflow-clip rounded-md bg-background shadow-sm">
      <header className="flex items-center justify-between gap-2 bg-brand-600 px-12 py-6 text-lg font-medium text-brand-50">
        <div className="flex items-center gap-4">
          <Warehouse role="presentation" />
          <div>
            <span>{pluralize("night", booking.no_nights, true)}</span>
            <span>&nbsp;in Cabin {booking.cabins.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span>
            <DatePresenter
              date={booking.start_date}
              formatString="E, MMM dd yyyy"
            />
          </span>
          <span>
            ( <DateDistancePresenter date={booking.start_date} />)
          </span>
          <Minus />
          <span>
            <DatePresenter
              date={booking.start_date}
              formatString="E, MMM dd yyyy"
            />
          </span>
        </div>
      </header>
      <div className="space-y-7 px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="font-medium">
            {booking.guests.full_name}
            <span aria-label="and">&nbsp;+&nbsp;</span>
            {pluralize("guest", booking.no_guests, true)}
          </div>
          <span className="text-2xl font-bold" role="presentation">
            &middot;
          </span>
          <div>{booking.guests.email}</div>
          <span className="text-2xl font-bold" role="presentation">
            &middot;
          </span>
          <div>{booking.guests.nationality}</div>
        </div>

        <span className="sr-only">
          {booking.has_breakfast
            ? "This booking includes breakfast"
            : "This booking does not include breakfast"}
        </span>

        <div className="flex items-center gap-3 font-medium">
          <Sandwich role="presentation" />
          <span>Breakfast included?</span>
          {booking.has_breakfast ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-gray-900">No</span>
          )}
        </div>

        {booking.observations && (
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <MessageSquareWarning role="presentation" />
              <span className="font-medium">Notes</span>
            </div>
            <p className="p-4">{booking.observations}</p>
          </div>
        )}

        <div
          className={classnames(
            "flex items-center justify-between rounded-md px-8 py-6",
            booking.is_paid
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800",
          )}
        >
          <div className="flex items-center gap-3">
            <CircleDollarSign role="presentation" />
            <span className="font-medium">Total price</span>
            <span>
              <CurrencyPresenter amount={booking.total_due} />
            </span>
          </div>

          <span className="font-semibold uppercase">
            {booking.is_paid ? "Paid" : "Will paid at check-in"}
          </span>
        </div>

        <footer className="text-end text-sm drop-shadow-sm">
          <p>
            Booked on &nbsp;
            <DatePresenter
              date={booking.created_at}
              formatString="E, MMM dd yyyy, h:mm a"
            />
          </p>
        </footer>
      </div>
    </div>
  );
}
