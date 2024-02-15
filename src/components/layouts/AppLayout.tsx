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
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="[&_>_aside]:h-full"
          defaultSize={18} //! in percentage
          minSize={12}
          maxSize={20}
        >
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
