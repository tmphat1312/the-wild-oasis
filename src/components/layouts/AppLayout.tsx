import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] bg-gray-100">
      <Sidebar className="row-span-full" />
      <div className="container grid h-dvh grid-rows-[auto_1fr] gap-y-6 p-8 pb-6 pt-2">
        <Header />
        <Main />
      </div>
    </div>
  );
}
