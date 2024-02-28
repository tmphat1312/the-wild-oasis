import { MoreVerticalIcon } from "@/components/Icons";
import {
  Button,
  Menu,
  MenuTrigger,
  Popover,
  type MenuProps,
  type MenuTriggerProps,
} from "react-aria-components";

type MyMenuButtonProps<T> = MenuProps<T> & Omit<MenuTriggerProps, "children">;

export function MenuButton<T extends object>({
  children,
  ...props
}: MyMenuButtonProps<T>) {
  return (
    <MenuTrigger {...props}>
      <Button aria-label="Menu" className="aria-expanded:bg-gray-100">
        <span className="sr-only">more actions</span>
        <MoreVerticalIcon role="presentation" size={18} />
      </Button>
      <Popover placement="bottom right">
        <Menu
          {...props}
          className="rounded-md border bg-background p-1 text-sm shadow"
        >
          {children}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
