import { classnames } from "@/lib/classnames";
import { Table as RACTable, TableProps } from "react-aria-components";

export function Table(props: TableProps) {
  return (
    <div className="contain-paint rounded-lg border shadow">
      <RACTable {...props} className={classnames("w-full", props.className)} />
    </div>
  );
}
