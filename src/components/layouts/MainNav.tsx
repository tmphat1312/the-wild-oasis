import {
  BookingIcon,
  CabinIcon,
  DashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "../Icons";
import MainNavLink from "../ui/MainNavLink";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { to: "/bookings", label: "Bookings", icon: BookingIcon },
  { to: "/cabins", label: "Cabins", icon: CabinIcon },
  { to: "/users", label: "Users", icon: UsersIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
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
