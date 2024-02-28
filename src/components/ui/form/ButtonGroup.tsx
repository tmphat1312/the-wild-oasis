import { classnames } from "@/lib/classnames";

type ButtonGroupProps = React.ComponentProps<"div">;

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <div {...props} className={classnames("space-x-3 pt-2", props.className)} />
  );
}
