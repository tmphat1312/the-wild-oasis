import { Fragment, useState } from "react";

import { DuplicateIcon, EditIcon, TrashIcon } from "@/components/Icons";
import { ConfirmDelete } from "@/components/ui/ConfirmDelete";
import { Dialog } from "@/components/ui/Dialog";
import { Menu } from "@/components/ui/Menu-v1/Menu";
import { MenuItem } from "@/components/ui/Menu-v1/MenuItem";
import { Modal } from "@/components/ui/Modal";
import { CabinType } from "@/schemas/CabinSchema";
import { Button, DialogTrigger } from "react-aria-components";
import { UpdateCabinForm } from "./UpdateCabinForm";
import { useDeleteCabinById } from "./useDeleteCabinById";
import { useDuplicateCabin } from "./useDuplicateCabin";

type CabinTableRowActionsProps = {
  cabin: CabinType;
};

export function CabinTableRowActions({ cabin }: CabinTableRowActionsProps) {
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const { deleteCabin } = useDeleteCabinById({
    cabinId: cabin.id,
    cabinImage: cabin.image,
  });
  const { duplicateCabin } = useDuplicateCabin();

  function handleCloseModal() {
    setModalType(null);
  }

  return (
    <Fragment>
      <Menu>
        <MenuItem
          Icon={DuplicateIcon}
          onClick={() => duplicateCabin({ cabin })}
        >
          Duplicate
        </MenuItem>
        <MenuItem Icon={EditIcon} onClick={() => setModalType("edit")}>
          Edit
        </MenuItem>
        <MenuItem
          Icon={TrashIcon}
          variant="destructive"
          onClick={() => setModalType("delete")}
        >
          Delete
        </MenuItem>
      </Menu>
      <ConfirmDelete
        isOpen={modalType == "delete"}
        description="Are you sure you want to delete this cabin?"
        title="Delete Cabin"
        onAction={deleteCabin}
        closeFn={handleCloseModal}
      />
      <DialogTrigger isOpen={modalType == "edit"}>
        <Button aria-label="update the cabin" className="sr-only" />
        <Modal className="max-w-[880px]">
          <Dialog>
            <UpdateCabinForm closeModal={handleCloseModal} cabin={cabin} />
          </Dialog>
        </Modal>
      </DialogTrigger>
    </Fragment>
  );
}
