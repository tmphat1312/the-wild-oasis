import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="h-screen grid grid-cols-[240px_auto] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-full" />
      <Header />
      <Main />
    </div>
  );
}
