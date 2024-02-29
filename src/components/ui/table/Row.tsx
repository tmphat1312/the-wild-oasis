import { classnames } from "@/lib/classnames";

export function Row(props: React.ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      {...props}
      className={classnames(
        "group/row bg-background hover:bg-gray-50/50",
        props.className,
      )}
    />
  );
}
