import { cn } from "@/lib/utils";
import { Cell as RACCell, CellProps } from "react-aria-components";

export function Cell(props: CellProps) {
  return (
    <RACCell
      {...props}
      className={cn(
        "border-b border-gray-100 px-3 py-2 group-last-of-type/row:border-0",
        props.className,
      )}
    />
  );
}
