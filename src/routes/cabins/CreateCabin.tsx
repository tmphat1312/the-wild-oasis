import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Modal } from "@/components/ui/Modal";
import { DialogTrigger } from "react-aria-components";
import { CreateCabinForm } from "./CreateCabinForm";

export function CreateCabin() {
  return (
    <DialogTrigger>
      <Button>Add new cabin</Button>
      <Modal isDismissable className="max-w-[880px]">
        <Dialog>{({ close }) => <CreateCabinForm closeModal={close} />}</Dialog>
      </Modal>
    </DialogTrigger>
  );
}