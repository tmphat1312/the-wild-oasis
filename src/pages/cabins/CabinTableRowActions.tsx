import { Copy, Pencil, Trash } from "lucide-react";
import { Fragment, useState } from "react";
import { Key } from "react-aria-components";

import { ConfirmDelete } from "@/components/ui/ConfirmDelete-v1";
import { MenuButton } from "@/components/ui/menu/MenuButton";
import { MenuItem } from "@/components/ui/menu/MenuItem";
import { CabinValues } from "@/schemas/cabinSchema";
import { useDeleteCabinById } from "./useDeleteCabinById";

interface CabinTableRowActionsProps {
  cabinId: CabinValues["id"];
}

export function CabinTableRowActions({ cabinId }: CabinTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteCabin } = useDeleteCabinById({ cabinId });

  function handleAction(key: Key) {
    if (key == "delete") {
      setIsOpen(true);
    } else {
      alert(`Action: ${key}`);
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleDeleteCabin() {
    deleteCabin();
    handleCloseModal();
  }

  return (
    <Fragment>
      <ConfirmDelete
        title="Delete cabin"
        description="Are you sure you want to delete this cabin? This action cannot be undone."
        isOpen={isOpen}
        closeFn={handleCloseModal}
        onAction={handleDeleteCabin}
      />
      <MenuButton onAction={handleAction}>
        <MenuItem icon={Copy} id="duplicate">
          Duplicate
        </MenuItem>
        <MenuItem icon={Pencil} id="edit">
          Edit
        </MenuItem>
        <MenuItem icon={Trash} id="delete" variant="destructive">
          Delete
        </MenuItem>
      </MenuButton>
    </Fragment>
  );
}
