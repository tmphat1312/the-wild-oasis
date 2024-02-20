import { cn } from "@/lib/utils";

interface ButtonGroupProps extends React.ComponentProps<"div"> {}

export function ButtonGroup(props: ButtonGroupProps) {
  return <div {...props} className={cn("space-x-3 pt-2", props.className)} />;
}
