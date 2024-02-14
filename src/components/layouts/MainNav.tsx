import { IconType } from "react-icons";
import {
  HiOutlineCalendarDays,
  HiOutlineCog8Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import MainNavLink from "../ui/MainNavLink";

const navLinks: {
  to: string;
  label: string;
  icon: IconType;
}[] = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineHome },
  { to: "/bookings", label: "Bookings", icon: HiOutlineCalendarDays },
  { to: "/cabins", label: "Cabins", icon: HiOutlineHomeModern },
  { to: "/users", label: "Users", icon: HiOutlineUsers },
  { to: "/settings", label: "Settings", icon: HiOutlineCog8Tooth },
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
