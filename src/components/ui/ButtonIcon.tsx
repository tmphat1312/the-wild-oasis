import { classnames } from "@/lib/classnames";
import { MiniSpinner } from "./MiniSpinner";

type ButtonIconProps = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

export function ButtonIcon({
  loading = false,
  children,
  ...props
}: ButtonIconProps) {
  return (
    <button
      {...props}
      className={classnames(
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
