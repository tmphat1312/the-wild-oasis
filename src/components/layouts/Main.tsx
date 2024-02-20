import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="overflow-y-auto overflow-x-hidden">
      <Outlet />
    </main>
  );
}
