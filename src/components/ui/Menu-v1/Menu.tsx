import { MenuIcon } from "@/components/Icons";
import { Root, Trigger, Portal, Content } from "@radix-ui/react-dropdown-menu";

export function Menu(props: React.PropsWithChildren) {
  return (
    <Root>
      <Trigger
        aria-label="Menu"
        className="rounded p-0.5 hover:bg-gray-100 aria-expanded:bg-gray-50"
      >
        <span className="sr-only">more actions</span>
        <MenuIcon role="presentation" size={18} />
      </Trigger>
      <Portal>
        <Content
          className="rounded-lg bg-background shadow"
          sideOffset={5}
          align="end"
        >
          {props.children}
        </Content>
      </Portal>
    </Root>
  );
}
