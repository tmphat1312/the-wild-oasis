import { useFormFieldContext } from "@/contexts/FormFieldContext";
import { classnames } from "@/lib/classnames";
import { forwardRef } from "react";

type SelectProps = React.ComponentPropsWithRef<"select"> & {
  options: { value: string | number; label: string }[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { options, ...rest } = props;
    const { id, disabled } = useFormFieldContext();

    return (
      <select
        id={id}
        disabled={disabled}
        aria-describedby={`${id}-error`}
        {...rest}
        ref={ref}
        className={classnames(
          "rounded-md border px-3 py-2 text-sm font-medium shadow",
          "disabled:bg-gray-100",
          rest.className,
        )}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
);
