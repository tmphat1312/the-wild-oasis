import { classnames } from "@/lib/classnames";

export function Column(props: React.ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={classnames(
        "sticky top-0",
        "bg-gray-100 px-3 py-3",
        "text-start text-sm font-medium uppercase tracking-wide",
      )}
      {...props}
    />
  );
}
