import { AlertCircleIcon } from "lucide-react";
import { Fragment } from "react";
import { chain } from "react-aria";
import {
  DialogTrigger,
  DialogTriggerProps,
  Heading,
} from "react-aria-components";

import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { Modal } from "./Modal";

type ConfirmDeleteProps = Omit<DialogTriggerProps, "children"> & {
  title: string;
  description: string;
  actionLabel?: string;
  cancelLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
  closeFn?: () => void;
};

export function ConfirmDelete({
  title,
  description,
  cancelLabel = "Cancel",
  actionLabel = "Delete",
  onAction = () => {},
  onClose = () => {},
  closeFn = () => {},
  ...props
}: ConfirmDeleteProps) {
  return (
    <DialogTrigger {...props}>
      <Button aria-label="Delete" className="sr-only text-red-500" />
      <Modal className="max-w-md">
        <Dialog role="alertdialog">
          {({ close }) => (
            <Fragment>
              <Heading
                slot="title"
                className="my-0 text-xl font-semibold leading-6"
              >
                {title}
              </Heading>
              <div className="absolute right-6 top-6 h-6 w-6 stroke-2 text-red-500">
                <AlertCircleIcon aria-hidden />
              </div>
              <p className="mt-3 text-slate-500">{description}</p>
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onPress={chain(onClose, closeFn, close)}
                >
                  {cancelLabel}
                </Button>
                <Button
                  variant="destructive"
                  onPress={chain(onAction, closeFn, close)}
                >
                  {actionLabel}
                </Button>
              </div>
            </Fragment>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
