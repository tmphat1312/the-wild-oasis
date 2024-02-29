import { useFormFieldContext } from "@/contexts/FormFieldContext";
import { classnames } from "@/lib/classnames";
import { forwardRef } from "react";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, disabled } = useFormFieldContext();

  return (
    <input
      {...props}
      id={id}
      ref={ref}
      className={classnames(
        "rounded-md border border-s-4 border-border px-2.5 py-1.5",
        props.className,
      )}
      disabled={disabled || props.disabled}
      aria-describedby={`${id}-error`}
    />
  );
});
