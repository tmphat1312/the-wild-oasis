import { cn } from "@/lib/utils";

type ButtonGroupProps = React.ComponentProps<"div">;

export function ButtonGroup(props: ButtonGroupProps) {
  return <div {...props} className={cn("space-x-3 pt-2", props.className)} />;
}
