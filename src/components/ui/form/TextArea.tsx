import { classnames } from "@/lib/classnames";
import { forwardRef } from "react";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>((props, ref) => {
  return (
    <textarea
      rows={6}
      {...props}
      ref={ref}
      className={classnames(
        "block w-full max-w-prose rounded-md border border-s-4 border-border px-3 py-2",
        props.className,
      )}
    />
  );
});
