import { cn } from "@/lib/utils";
import {
  ModalOverlay,
  ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay
      {...props}
      className={cn(
        "fixed inset-0 isolate z-20 h-dvh",
        "flex  items-center justify-center bg-black/5 p-4 backdrop-blur-md",
      )}
    >
      <RACModal
        {...props}
        className={cn(
          "max-h-full w-full overflow-y-auto rounded-2xl border shadow-2xl",
          "bg-background bg-clip-padding text-left align-middle",
          props.className,
        )}
      />
    </ModalOverlay>
  );
}
