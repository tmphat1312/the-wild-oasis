import {
  CheckInIcon,
  CheckOutIcon,
  EyeIcon,
  TrashIcon,
} from "@/components/Icons";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { Menu } from "@/components/ui/menu/Menu";
import { MenuItem } from "@/components/ui/menu/MenuItem";
import { BookingType } from "@/schemas/BookingSchema";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckoutBooking } from "./useCheckoutBooking";
import { useDeleteBookingById } from "./useDeleteBookingById";

type BookingTableRowActionsProps = {
  booking: BookingType;
};

export function BookingRowActions({ booking }: BookingTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteBooking } = useDeleteBookingById();
  const { checkoutBooking } = useCheckoutBooking({ bookingId: booking.id });

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <Menu>
        <MenuItem
          Icon={EyeIcon}
          onClick={() => navigate(`/bookings/${booking.id}`)}
        >
          See details
        </MenuItem>
        {booking.status == "unconfirmed" && (
          <MenuItem
            Icon={CheckInIcon}
            onClick={() => navigate(`/check-in/${booking.id}`)}
          >
            Check in
          </MenuItem>
        )}
        {booking.status == "checked in" && (
          <MenuItem Icon={CheckOutIcon} onClick={() => checkoutBooking()}>
            Check out
          </MenuItem>
        )}
        <MenuItem
          Icon={TrashIcon}
          variant="destructive"
          onClick={() => setIsOpen(true)}
        >
          Delete booking
        </MenuItem>
      </Menu>
      <ConfirmDelete
        isOpen={isOpen}
        description="Are you sure you want to delete this booking?"
        title="Delete Booking"
        onAction={() => deleteBooking({ bookingId: booking.id })}
        closeFn={handleCloseModal}
      />
    </Fragment>
  );
}
