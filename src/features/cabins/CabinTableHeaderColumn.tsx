import { cn } from "@/lib/utils";

type HeaderColumnProps = React.ComponentPropsWithoutRef<"div">;

export default function HeaderColumn({
  className,
  ...props
}: HeaderColumnProps) {
  return (
    <div
      {...props}
      className={cn("uppercase text-foreground font-medium", className)}
    />
  );
}
