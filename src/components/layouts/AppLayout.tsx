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
          defaultSize={16} //! in percentage
          minSize={8}
          maxSize={24}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="[&_>main]:h-full" defaultSize={80}>
          <Header />
          <Main />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
