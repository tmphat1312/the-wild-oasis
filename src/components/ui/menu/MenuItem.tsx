import { classnames } from "@/lib/classnames";
import { IconType } from "@/types/icon";
import {
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
} from "react-aria-components";

type MenuItemProps = RACMenuItemProps & {
  icon?: IconType;
  variant?: "default" | "destructive";
};

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <RACMenuItem
      {...props}
      textValue={textValue}
      className={classnames(
        "flex cursor-pointer items-center gap-3 px-5 py-2 hover:bg-gray-50",
        props.variant === "destructive" && "text-red-500",
      )}
    >
      <>
        {props.icon && <props.icon size={14} />}
        {props.children}
      </>
    </RACMenuItem>
  );
}
