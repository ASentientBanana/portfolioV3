import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ReactNode } from "react";

const Sidebar = ({
  children,
  outlet,
}: {
  children: ReactNode;
  outlet: ReactNode;
}) => {
  return (
    <div className="w-full" style={{ height: "100vh" }}>
      <ResizablePanelGroup direction="horizontal" className=" w-full">
        <ResizablePanel maxSize={40} minSize={10} defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle style={{ width: "4px" }} withHandle={false} />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            {outlet}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Sidebar;
