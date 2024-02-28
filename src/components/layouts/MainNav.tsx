import { NavLink } from "react-router-dom";

import { classnames } from "@/lib/classnames";
import {
  BookingIcon,
  CabinIcon,
  DashboardIcon,
  SettingsIcon,
  UsersIcon,
  IconType,
} from "../Icons";

type NavLinkType = {
  to: string;
  label: string;
  Icon: IconType;
};

const navLinks: NavLinkType[] = [
  { to: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { to: "/bookings", label: "Bookings", Icon: BookingIcon },
  { to: "/cabins", label: "Cabins", Icon: CabinIcon },
  { to: "/users", label: "Users", Icon: UsersIcon },
  { to: "/settings", label: "Settings", Icon: SettingsIcon },
];

export default function MainNav() {
  return (
    <nav aria-label="Main navigation of the app">
      <ul className="flex flex-col gap-2">
        {navLinks.map((linkItem) => (
          <li key={linkItem.to}>
            <NavLink
              to={linkItem.to}
              className={({ isActive }) =>
                classnames(
                  "flex items-center gap-3 rounded-sm px-4 py-3 font-medium",
                  "hover:bg-gray-50 [&:hover_svg]:stroke-brand-600",
                  isActive && "bg-gray-50 [&_svg]:stroke-brand-600",
                )
              }
            >
              <linkItem.Icon size={22} role="presentation" />
              <span className="line-clamp-1 min-w-[12ch] max-w-[18ch]">
                {linkItem.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
