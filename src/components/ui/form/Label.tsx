import { useFormFieldContext } from "@/contexts/FormFieldContext";
import { classnames } from "@/lib/classnames";

type LabelProps = React.ComponentProps<"label"> & {
  required?: boolean;
};

export function Label(props: LabelProps) {
  const { id } = useFormFieldContext();

  return (
    <label
      htmlFor={id}
      {...props}
      className={classnames("text-sm font-medium", props.className)}
    />
  );
}
