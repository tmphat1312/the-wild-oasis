import { IconType } from "@/components/Icons";
import { classnames } from "@/lib/classnames";
import { Item } from "@radix-ui/react-dropdown-menu";

type Props = React.ComponentProps<"button"> & {
  Icon?: IconType;
  variant?: "default" | "destructive";
};

export function MenuItem({ Icon, children, variant, ...props }: Props) {
  return (
    <Item>
      <button
        {...props}
        className={classnames(
          "flex w-full cursor-pointer items-center gap-3 px-5 py-2 text-sm hover:bg-gray-50/80",
          variant === "destructive" && "text-destructive",
          props.className,
        )}
      >
        {Icon && <Icon size={14} />}
        {children}
      </button>
    </Item>
  );
}
