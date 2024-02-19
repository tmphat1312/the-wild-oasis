import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="container overflow-x-auto py-4">
      <Outlet />
    </main>
  );
}
