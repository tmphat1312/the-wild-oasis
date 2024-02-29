import { classnames } from "@/lib/classnames";

export function Cell(props: React.ComponentPropsWithoutRef<"td">) {
  return (
    <td
      {...props}
      className={classnames(
        "border-b border-gray-100 px-3 py-2 group-last/row:border-0",
        props.className,
      )}
    />
  );
}
