import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="container py-6 overflow-y-auto">
      <Outlet />
    </main>
  );
}
