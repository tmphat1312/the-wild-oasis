import { cn } from "@/lib/utils";
import { Collection, Row as RACRow, RowProps } from "react-aria-components";

export function Row<T extends object>({
  id,
  columns,
  children,
  ...props
}: RowProps<T>) {
  return (
    <RACRow
      id={id}
      {...props}
      className={cn(
        "group/row bg-background hover:bg-gray-50",
        props.className,
      )}
    >
      <Collection items={columns}>{children}</Collection>
    </RACRow>
  );
}
