import { classnames } from "@/lib/classnames";
import { Cell as RACCell, CellProps } from "react-aria-components";

export function Cell(props: CellProps) {
  return (
    <RACCell
      {...props}
      className={classnames(
        "border-b border-gray-100 px-6 py-2 group-last-of-type/row:border-0",
        props.className,
      )}
    />
  );
}
