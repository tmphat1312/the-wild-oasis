import Logo from "./Logo";
import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className="px-6 py-8 space-y-8 bg-background">
      <Logo />
      <MainNav />
    </aside>
  );
}
