import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="scrollbar-gutter overflow-y-auto overflow-x-hidden">
      <Outlet />
    </main>
  );
}
