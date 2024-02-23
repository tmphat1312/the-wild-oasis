import { cn } from "@/lib/utils";
import Logo from "../ui/Logo";
import MainNav from "./MainNav";
import { Uploader } from "@/data/Uploader";

type SidebarProps = React.ComponentProps<"aside">;

export default function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn("space-y-8 bg-background px-6 py-8", className)}
      {...props}
    >
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
}
