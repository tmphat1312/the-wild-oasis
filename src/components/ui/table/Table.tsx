import { cn } from "@/lib/utils";
import { Table as RACTable, TableProps } from "react-aria-components";

export function Table(props: TableProps) {
  return (
    <div className="contain-paint rounded-lg border shadow">
      <RACTable {...props} className={cn("w-full", props.className)} />
    </div>
  );
}
