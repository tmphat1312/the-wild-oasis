import CurrencyPresenter from "@/components/presenters/CurrencyPresenter";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/form/Form";
import { BookingDetailValues } from "@/schemas/bookingSchema";
import { useState } from "react";
import { useCheckInBooking } from "../bookings/useCheckInBooking";
import { useSettings } from "../settings/useSettings";
import { Skeleton } from "@/components/ui/Skeleton";

type CheckInActionsProps = {
  booking: BookingDetailValues;
};

export function CheckInActions({ booking }: CheckInActionsProps) {
  const [isAddingBreakfast, setIsAddingBreakfast] = useState(
    booking.has_breakfast,
  );
  const [isConfirming, setIsConfirming] = useState(booking.is_paid);
  const { isCheckingIn, checkInBooking } = useCheckInBooking({
    bookingId: booking.id,
  });
  const { isLoading: isSettingsLoading, data: settings } = useSettings();

  if (isSettingsLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-background px-12 py-6">
          <Skeleton className="h-10" />
        </div>
        <div className="bg-background px-12 py-6">
          <Skeleton className="h-10" />
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkInBooking({
      breakfast: isAddingBreakfast
        ? {
            breakfastPrice: settings?.breakfast_price || 15,
            totalGuests: booking.no_guests,
            currentTotalDue: booking.total_due,
          }
        : undefined,
    });
  }

  const cannotSubmit = isCheckingIn || !isConfirming;
  const bfPrice = (settings?.breakfast_price || 15) * (booking.no_guests + 1);
  const totalDue = isAddingBreakfast
    ? booking.total_due + bfPrice
    : booking.total_due;

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">
      {!booking.has_breakfast && settings && (
        <div className="flex items-center gap-4 rounded bg-background px-12 py-6 shadow-sm">
          <input
            type="checkbox"
            id="bf"
            className="size-5"
            disabled={booking.has_breakfast}
            checked={isAddingBreakfast}
            onChange={() => setIsAddingBreakfast(!isAddingBreakfast)}
          />
          <label htmlFor="bf">
            Would you like to add breakfast for&nbsp;
            <span className="font-medium">
              <CurrencyPresenter amount={bfPrice} />
            </span>
            ?
          </label>
        </div>
      )}

      {!booking.is_paid && (
        <div className="flex items-center gap-4 rounded bg-background px-12 py-6 shadow-sm">
          <input
            type="checkbox"
            id="confirm"
            className="size-5"
            disabled={booking.is_paid}
            checked={isConfirming}
            onChange={() => setIsConfirming(!isConfirming)}
          />
          <label htmlFor="confirm">
            I confirm that&nbsp;
            <span className="font-medium">{booking.guests.full_name}</span> has
            paid the total amount of&nbsp;
            <span className="font-medium">
              <CurrencyPresenter amount={totalDue} />
            </span>
          </label>
        </div>
      )}

      <div className="space-x-3 text-end">
        <Button isDisabled={cannotSubmit} type="submit">
          Check in booking #{booking.id}
        </Button>
        <BackButton type="button" />
      </div>
    </Form>
  );
}
