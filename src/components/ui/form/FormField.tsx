import { FormFieldProvider } from "@/contexts/FormFieldContext";
import { useId } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { classnames } from "@/lib/classnames";

type FormFieldProps = React.ComponentProps<"div"> & {
  variant?: "vertical" | "horizontal";
};

export function FormField({
  variant = "horizontal",
  ...props
}: FormFieldProps) {
  const { isSubmitting } = useFormContext();
  const id = useId();

  return (
    <FormFieldProvider value={{ id, disabled: !!isSubmitting }}>
      <div
        {...props}
        className={classnames(
          "flex w-full flex-col gap-1.5",
          variant == "horizontal" &&
            "grid grid-cols-[20ch_minmax(16ch,32ch)_1fr] items-center gap-4",
          "border-t border-border py-3",
          "first:border-t-0 first:pt-0",
          props.className,
        )}
      />
    </FormFieldProvider>
  );
}
