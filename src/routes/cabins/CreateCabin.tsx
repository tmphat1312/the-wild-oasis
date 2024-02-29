import { Dialog } from "@/components/ui/Dialog";
import { Modal } from "@/components/ui/Modal";
import { DialogTrigger, Button } from "react-aria-components";
import { CreateCabinForm } from "./CreateCabinForm";

export function CreateCabin() {
  return (
    <DialogTrigger>
      <Button className="rounded-md border bg-brand-600 px-4 py-3 text-center text-sm text-brand-50">
        Add new cabin
      </Button>
      <Modal isDismissable className="max-w-[880px]">
        <Dialog>{({ close }) => <CreateCabinForm closeModal={close} />}</Dialog>
      </Modal>
    </DialogTrigger>
  );
}
