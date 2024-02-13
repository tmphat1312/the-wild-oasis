import MainNavLink from "../ui/MainNavLink";

const navLinks: {
  to: string;
  label: string;
}[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/bookings", label: "Bookings" },
  { to: "/cabins", label: "Cabins" },
  { to: "/users", label: "Users" },
  { to: "/settings", label: "Settings" },
] as const;

export default function MainNav() {
  return (
    <nav aria-label="Main navigation of the app">
      <ul className="flex flex-col gap-2">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <MainNavLink to={to}>{label}</MainNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
