import MainNavLink from "../ui/MainNavLink";
import { Home, CalendarDays, Warehouse, Users, Settings } from "lucide-react";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/cabins", label: "Cabins", icon: Warehouse },
  { to: "/users", label: "Users", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export default function MainNav() {
  return (
    <nav aria-label="Main navigation of the app">
      <ul className="flex flex-col gap-2">
        {navLinks.map((linkItem) => (
          <li key={linkItem.to}>
            <MainNavLink {...linkItem} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
