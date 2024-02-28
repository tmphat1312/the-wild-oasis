import { classnames } from "@/lib/classnames";
import { Logo } from "../ui/Logo";
import { MainNav } from "./MainNav";

type SidebarProps = React.ComponentProps<"aside">;

export function Sidebar(props: SidebarProps) {
  return (
    <aside
      {...props}
      className={classnames(
        "space-y-8 bg-background px-4 py-12",
        props.className,
      )}
    >
      <Logo />
      <MainNav />
    </aside>
  );
}
