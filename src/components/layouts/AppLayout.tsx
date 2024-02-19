import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-100">
      <Sidebar className="row-span-full" />
      <Header />
      <Main />
    </div>
  );
}
