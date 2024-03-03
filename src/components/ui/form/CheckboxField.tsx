import { FormFieldProvider } from "@/contexts/FormFieldContext";
import { useId } from "react";
import { useFormContext } from "@/contexts/FormContext";
import { classnames } from "@/lib/classnames";

type CheckboxFieldProps = React.ComponentProps<"div">;

export function CheckboxField(props: CheckboxFieldProps) {
  const { isSubmitting } = useFormContext();
  const id = useId();

  return (
    <FormFieldProvider value={{ id, disabled: !!isSubmitting }}>
      <div
        {...props}
        className={classnames(
          "flex w-full items-center gap-5",
          "border-t border-border",
          "px-5 py-8",
          "first:border-t-0 first:pt-0",
          props.className,
        )}
      />
    </FormFieldProvider>
  );
}
