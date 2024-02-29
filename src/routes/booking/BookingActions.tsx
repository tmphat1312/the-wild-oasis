import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { BookingDetailType } from "@/schemas/BookingSchema";
import { useDeleteBookingById } from "../bookings/useDeleteBookingById";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { useCheckoutBooking } from "../bookings/useCheckoutBooking";

type BookingActionsProps = {
  bookingId: BookingDetailType["id"];
  bookingStatus: BookingDetailType["status"];
};

export function BookingActions({
  bookingId,
  bookingStatus,
}: BookingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteBooking } = useDeleteBookingById();
  const { isCheckingOut, checkoutBooking } = useCheckoutBooking({ bookingId });
  const navigate = useNavigate();

  function handleDelete() {
    deleteBooking(
      { bookingId },
      { onSuccess: () => navigate("/bookings", { replace: true }) },
    );
  }

  function handleCheckOut() {
    checkoutBooking();
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCheckIn() {
    navigate(`/check-in/${bookingId}`);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  const isWorking = isDeleting || isCheckingOut;

  return (
    <div className="space-x-3 text-end">
      <ConfirmDelete
        title="Delete booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
        isOpen={isOpen}
        closeFn={handleCloseModal}
        onAction={handleDelete}
      />
      {bookingStatus === "unconfirmed" && (
        <Fragment>
          <Button disabled={isWorking} onClick={handleCheckIn}>
            Check in
          </Button>
          <Button
            variant="destructive"
            onClick={handleOpenModal}
            disabled={isWorking}
          >
            Delete booking
          </Button>
        </Fragment>
      )}
      {bookingStatus === "checked in" && (
        <Button disabled={isWorking} onClick={handleCheckOut}>
          Check out
        </Button>
      )}
      <BackButton disabled={isWorking} />
    </div>
  );
}
