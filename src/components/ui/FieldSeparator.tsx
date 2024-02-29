import { classnames } from "@/lib/classnames";

type FieldSeparatorProps = React.ComponentPropsWithoutRef<"hr">;

export function FieldSeparator(props: FieldSeparatorProps) {
  return (
    <hr
      {...props}
      role="presentation"
      className={classnames(
        "my-3 border-gray-200/80 last-of-type:mb-4",
        props.className,
      )}
    />
  );
}
