import { Header } from "./Header";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[auto_1fr] overflow-x-clip bg-gray-100">
      <Sidebar className="row-span-full" />
      <div className="container relative max-h-full space-y-6 overflow-y-auto px-8 pb-6 pt-3">
        <Header />
        <Main />
      </div>
    </div>
  );
}
