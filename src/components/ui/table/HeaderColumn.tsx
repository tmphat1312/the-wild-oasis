import { ColumnProps, Column } from "react-aria-components";
import { cn } from "@/lib/utils";

export function HeaderColumn(props: ColumnProps) {
  return (
    <Column
      {...props}
      className={cn(
        "sticky top-0",
        "bg-gray-100 px-6 py-4",
        "text-start text-sm font-semibold uppercase tracking-wide",
        props.className,
      )}
    />
  );
}
