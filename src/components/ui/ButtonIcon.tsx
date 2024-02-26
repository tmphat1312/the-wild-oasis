import { cn } from "@/lib/utils";
import { MiniSpinner } from "./MiniSpinner";

interface ButtonIconProps extends React.ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
}

export function ButtonIcon({
  loading = false,
  children,
  ...props
}: ButtonIconProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex size-7 items-center rounded p-1",
        "text-brand-600 [&_svg]:text-current",
        "[&:not(:disabled)]:hover:bg-brand-50",
        "disabled:opacity-50 disabled:grayscale",
        props.className,
      )}
    >
      {loading ? <MiniSpinner /> : children}
    </button>
  );
}
