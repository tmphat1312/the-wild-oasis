import { Fragment } from "react";
import { chain } from "react-aria";
import {
  Button,
  DialogTrigger,
  DialogTriggerProps,
  Heading,
} from "react-aria-components";

import { tv } from "tailwind-variants";
import { AlertCircleIcon } from "../Icons";
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

const buttonVariants = tv({
  base: [
    "px-4 py-3 text-sm text-center rounded-md border",
    "hover:bg-opacity-90 hover:shadow-sm",
    "active:bg-opacity-100 active:shadow-none",
    "disabled:opacity-100 disabled:bg-gray-400 disabled:text-gray-50 disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      secondary: "bg-gray-100 text-gray-600",
      destructive: "bg-red-600 text-red-50",
    },
  },
});

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
      <Button aria-label="Delete" className="sr-only" />
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
                  className={buttonVariants({ variant: "secondary" })}
                  onPress={chain(onClose, closeFn, close)}
                >
                  {cancelLabel}
                </Button>
                <Button
                  className={buttonVariants({ variant: "destructive" })}
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
