import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="container h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="[&_>_aside]:h-full">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="[&_>main]:h-full">
          <Header />
          <Main />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
