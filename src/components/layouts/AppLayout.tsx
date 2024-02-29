import { Header } from "./Header";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] overflow-hidden  bg-gray-100">
      <Sidebar className="row-span-full" />
      <div className="container grid max-h-full grid-rows-[auto_1fr] space-y-6 overflow-y-auto px-12 pb-6 pt-3">
        <Header />
        <Main />
      </div>
    </div>
  );
}
