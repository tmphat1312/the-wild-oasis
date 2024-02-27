import { Copy, Pencil, Trash } from "lucide-react";
import { Fragment, useState } from "react";
import { Key } from "react-aria-components";

import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { MenuButton } from "@/components/ui/menu/MenuButton";
import { MenuItem } from "@/components/ui/menu/MenuItem";
import { CabinValues } from "@/schemas/cabinSchema";
import { useDeleteCabinById } from "./useDeleteCabinById";

import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Modal } from "@/components/ui/Modal";
import { DialogTrigger } from "react-aria-components";
import { UpdateCabinForm } from "./UpdateCabinForm";
import { useDuplicateCabin } from "./useDuplicateCabin";

type CabinTableRowActionsProps = {
  cabin: CabinValues;
};

export function CabinTableRowActions({ cabin }: CabinTableRowActionsProps) {
  const [modalType, setModalType] = useState<"edit" | "delete" | null>();
  const { deleteCabin } = useDeleteCabinById({
    cabinId: cabin.id,
    cabinImage: cabin.image,
  });
  const { duplicateCabin } = useDuplicateCabin();

  function handleAction(key: Key) {
    if (key == "delete") {
      setModalType("delete");
    } else if (key == "edit") {
      setModalType("edit");
    } else if (key == "duplicate") {
      duplicateCabin({ cabin });
    } else {
      throw new Error("Invalid action");
    }
  }

  function handleCloseModal() {
    setModalType(null);
  }

  return (
    <Fragment>
      <ConfirmDelete
        title="Delete cabin"
        description="Are you sure you want to delete this cabin? This action cannot be undone."
        isOpen={modalType === "delete"}
        closeFn={handleCloseModal}
        onAction={deleteCabin}
      />
      <DialogTrigger isOpen={modalType == "edit"}>
        <Button aria-label="update the cabin" className="sr-only" />
        <Modal isDismissable className="max-w-[880px]">
          <Dialog>
            <UpdateCabinForm closeModal={handleCloseModal} cabin={cabin} />
          </Dialog>
        </Modal>
      </DialogTrigger>
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
