import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { BookingDetailType } from "@/schemas/BookingSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckoutBooking } from "../bookings/useCheckoutBooking";
import { useDeleteBookingById } from "../bookings/useDeleteBookingById";

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
        <Button disabled={isWorking} onClick={handleCheckIn}>
          Check in
        </Button>
      )}
      {bookingStatus === "checked in" && (
        <Button disabled={isWorking} onClick={handleCheckOut}>
          Check out
        </Button>
      )}
      <Button
        variant="destructive"
        onClick={handleOpenModal}
        disabled={isWorking}
      >
        Delete booking
      </Button>
      <BackButton disabled={isWorking} />
    </div>
  );
}
