import { classnames } from "@/lib/classnames";

export function Empty(props: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={classnames("px-6 py-3 text-center text-lg", props.className)}
    />
  );
}
