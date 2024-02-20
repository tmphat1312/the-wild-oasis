import { cn } from "@/lib/utils";

interface FieldSeparatorProps extends React.ComponentPropsWithoutRef<"hr"> {}

export function FieldSeparator(props: FieldSeparatorProps) {
  return (
    <hr
      {...props}
      role="presentation"
      className={cn(
        "my-3 border-gray-200/80 last-of-type:mb-4",
        props.className,
      )}
    />
  );
}
