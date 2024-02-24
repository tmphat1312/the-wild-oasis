import { Eye, LogIn, LogOut, Trash } from "lucide-react";
import { Fragment, useState } from "react";
// import { Key } from "react-aria-components";

import { ConfirmDelete } from "@/components/ui/ConfirmDelete-v1";
import { MenuButton } from "@/components/ui/menu/MenuButton";
import { MenuItem } from "@/components/ui/menu/MenuItem";
import { BookingValues } from "@/schemas/bookingSchema";
import { Key } from "react-aria-components";
import { useNavigate } from "react-router-dom";

interface BookingTableRowActionsProps {
  booking: BookingValues;
}

enum MenuActionKeys {
  SeeDetails = "see-details",
  CheckOut = "check-out",
  CheckIn = "check-in",
  Delete = "delete",
}

export function BookingRowActions({ booking }: BookingTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleAction(key: Key) {
    if (key == MenuActionKeys.SeeDetails) {
      navigate(`/bookings/${booking.id}`);
    } else {
      alert(`Action: ${key}`);
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <ConfirmDelete
        title="Delete cabin"
        description="Are you sure you want to delete this cabin? This action cannot be undone."
        isOpen={isOpen}
        closeFn={handleCloseModal}
        // onAction={deleteCabin}
      />

      <MenuButton onAction={handleAction}>
        <MenuItem icon={Eye} id={MenuActionKeys.SeeDetails}>
          See details
        </MenuItem>
        <MenuItem icon={LogOut} id={MenuActionKeys.CheckOut}>
          Check out
        </MenuItem>
        <MenuItem icon={LogIn} id={MenuActionKeys.CheckIn}>
          Check in
        </MenuItem>
        <MenuItem icon={Trash} id={MenuActionKeys.Delete} variant="destructive">
          Delete booking
        </MenuItem>
      </MenuButton>
    </Fragment>
  );
}
