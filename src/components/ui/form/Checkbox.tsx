import { useFormFieldContext } from "@/contexts/FormFieldContext";
import { classnames } from "@/lib/classnames";
import { forwardRef } from "react";

type CheckboxProps = React.ComponentPropsWithoutRef<"input">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { id, disabled } = useFormFieldContext();

    return (
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        aria-describedby={`${id}-error`}
        {...props}
        ref={ref}
        className={classnames(
          "size-6 rounded-md border-4 border-border accent-brand-500",
          props.className,
        )}
      />
    );
  },
);
