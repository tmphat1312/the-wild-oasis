import { classnames } from "@/lib/classnames";
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
      className={classnames(
        "group/row bg-background hover:bg-gray-50",
        props.className,
      )}
    >
      <Collection items={columns}>{children}</Collection>
    </RACRow>
  );
}
