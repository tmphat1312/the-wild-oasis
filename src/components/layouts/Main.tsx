import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="bg-green-500">
      <Outlet />
    </main>
  );
}
