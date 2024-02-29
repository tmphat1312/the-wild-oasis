import { forwardRef, useId } from "react";
import { tv } from "tailwind-variants";

type NumberFieldProps = React.ComponentPropsWithRef<"input"> & {
  label?: string;
  errorMessage?: string;
};

const numberField = tv({
  slots: {
    input: "border-2 border-border rounded-md px-3 py-2",
  },
});

const { input } = numberField();

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (props, ref) => {
    const { label, errorMessage, ...inputProps } = props;
    const id = useId();

    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          {...inputProps}
          type="number"
          id={id}
          ref={ref}
          className={input()}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  },
);
