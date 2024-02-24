import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { BookingDetailValues } from "@/schemas/bookingSchema";
import { useDeleteBookingById } from "../bookings/useDeleteBookingById";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete-v1";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface BookingActionsProps {
  bookingId: BookingDetailValues["id"];
  bookingStatus: BookingDetailValues["status"];
}

export function BookingActions({
  bookingId,
  bookingStatus,
}: BookingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteBooking } = useDeleteBookingById();
  const navigate = useNavigate();

  function handleDelete() {
    deleteBooking({ bookingId }, { onSuccess: () => navigate("/bookings") });
  }

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

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
        <Button
          variant="destructive"
          onPress={handleOpenModal}
          isDisabled={isDeleting}
        >
          Delete booking
        </Button>
      )}
      <BackButton />
    </div>
  );
}
