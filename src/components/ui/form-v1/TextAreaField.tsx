import { classnames } from "@/lib/classnames";
import { FormField } from "./FormField";

export function TextAreaField(props: React.ComponentProps<"div">) {
  return (
    <FormField
      {...props}
      className={classnames(
        "grid grid-cols-[20ch_1fr] [&_[role='alert']]:col-start-2",
        props.className,
      )}
    />
  );
}
