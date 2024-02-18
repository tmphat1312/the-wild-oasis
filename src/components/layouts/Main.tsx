import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="container py-4 overflow-x-auto">
      <Outlet />
    </main>
  );
}
