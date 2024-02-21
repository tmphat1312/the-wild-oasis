import { ColumnProps, Column } from "react-aria-components";
import { cn } from "@/lib/utils";

export function HeaderColumn(props: ColumnProps) {
  return (
    <Column
      {...props}
      className={cn(
        "bg-gray-100 px-2 py-3",
        "text-start text-sm font-semibold uppercase tracking-wide",
        props.className,
      )}
    />
  );
}
