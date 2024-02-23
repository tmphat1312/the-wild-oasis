import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
  MenuItem as RACMenuItem,
  type MenuItemProps as RACMenuItemProps,
} from "react-aria-components";

interface MenuItemProps extends RACMenuItemProps {
  icon?: LucideIcon;
  variant?: "default" | "destructive";
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <RACMenuItem
      {...props}
      textValue={textValue}
      className={cn(
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
