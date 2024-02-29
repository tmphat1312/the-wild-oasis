import { useFormContext } from "@/contexts/FormContext";
import { classnames } from "@/lib/classnames";

export function ButtonField(props: React.ComponentProps<"div">) {
  const { isSubmitting } = useFormContext();

  return (
    <div
      {...props}
      className={classnames(
        "space-x-3 border-t pt-6 text-end",
        isSubmitting && "pointer-events-none grayscale-[75%]",
        props.className,
      )}
    />
  );
}
