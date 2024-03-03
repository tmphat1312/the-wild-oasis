import { AddIcon } from "@/components/Icons";
import { Dialog } from "@/components/ui/Dialog";
import { Modal } from "@/components/ui/Modal";
import { Button, DialogTrigger } from "react-aria-components";
import { CreateCabinForm } from "./CreateCabinForm";

export function CreateCabin() {
  return (
    <DialogTrigger>
      <Button className="rounded-md border bg-background p-1 shadow">
        <AddIcon size={28} className="stroke-gray-600" role="presentation" />
        <span className="sr-only">Add new booking</span>
      </Button>
      <Modal isDismissable className="max-w-[880px]">
        <Dialog>{({ close }) => <CreateCabinForm closeModal={close} />}</Dialog>
      </Modal>
    </DialogTrigger>
  );
}
