import { Fragment, useState } from "react";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { MenuButton } from "@/components/ui/menu/MenuButton";
import { MenuItem } from "@/components/ui/menu/MenuItem";
import { BookingType } from "@/schemas/BookingSchema";
import { Key } from "react-aria-components";
import { useNavigate } from "react-router-dom";
import { useDeleteBookingById } from "./useDeleteBookingById";
import { useCheckoutBooking } from "./useCheckoutBooking";
import {
  CheckInIcon,
  CheckOutIcon,
  TrashIcon,
  EyeIcon,
} from "@/components/Icons";

type BookingTableRowActionsProps = {
  booking: BookingType;
};

enum MenuActionKeys {
  SeeDetails = "see-details",
  CheckOut = "check-out",
  CheckIn = "check-in",
  Delete = "delete",
}

export function BookingRowActions({ booking }: BookingTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteBooking } = useDeleteBookingById();
  const { checkoutBooking } = useCheckoutBooking({ bookingId: booking.id });

  function handleAction(key: Key) {
    if (key == MenuActionKeys.SeeDetails) {
      navigate(`/bookings/${booking.id}`);
    } else if (key == MenuActionKeys.Delete) {
      setIsOpen(true);
    } else if (key == MenuActionKeys.CheckOut) {
      checkoutBooking();
    } else if (key == MenuActionKeys.CheckIn) {
      navigate(`/check-in/${booking.id}`);
    } else {
      throw Error(`Unhandled action key: ${key}`);
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <ConfirmDelete
        title="Delete booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
        isOpen={isOpen}
        closeFn={handleCloseModal}
        onAction={() => deleteBooking({ bookingId: booking.id })}
      />

      <MenuButton onAction={handleAction}>
        <MenuItem icon={EyeIcon} id={MenuActionKeys.SeeDetails}>
          See details
        </MenuItem>
        {booking.status == "unconfirmed" && (
          <MenuItem icon={CheckInIcon} id={MenuActionKeys.CheckIn}>
            Check in
          </MenuItem>
        )}
        {booking.status == "checked in" && (
          <MenuItem icon={CheckOutIcon} id={MenuActionKeys.CheckOut}>
            Check out
          </MenuItem>
        )}
        <MenuItem
          icon={TrashIcon}
          id={MenuActionKeys.Delete}
          variant="destructive"
        >
          Delete booking
        </MenuItem>
      </MenuButton>
    </Fragment>
  );
}
