import { AlertCircleIcon, InfoIcon } from "lucide-react";
import { Fragment } from "react";
import { chain } from "react-aria";
import { DialogProps, Heading } from "react-aria-components";

import { Button } from "./Button";
import { Dialog } from "./Dialog";

type AlertDialogProps = Omit<DialogProps, "children"> & {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "destructive";
  actionLabel: string;
  cancelLabel?: string;
  onClose?: () => void;
  onAction?: () => void;
};

export function AlertDialog({
  title,
  variant,
  cancelLabel,
  actionLabel,
  onAction = () => {},
  onClose = () => {},
  children,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <Fragment>
          <Heading
            slot="title"
            className="my-0 text-xl font-semibold leading-6"
          >
            {title}
          </Heading>
          <div
            className={`absolute right-6 top-6 h-6 w-6 stroke-2 ${variant === "destructive" ? "text-red-500" : "text-blue-500"}`}
          >
            {variant === "destructive" ? (
              <AlertCircleIcon aria-hidden />
            ) : (
              <InfoIcon aria-hidden />
            )}
          </div>
          <p className="mt-3 text-slate-500 dark:text-zinc-400">{children}</p>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="secondary" onPress={chain(onClose, close)}>
              {cancelLabel || "Cancel"}
            </Button>
            <Button
              variant={variant === "destructive" ? "destructive" : "primary"}
              autoFocus
              onPress={chain(onAction, close)}
            >
              {actionLabel}
            </Button>
          </div>
        </Fragment>
      )}
    </Dialog>
  );
}
