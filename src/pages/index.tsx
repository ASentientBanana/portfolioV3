import { LoginModal } from "@/components/modals/login";
import Navbar from "@/components/nav/navbar";
import { ProjectsContextProvider } from "@/context/projects";
import useKeybindings from "@/hooks/useKeybindings";
import { Outlet } from "react-router-dom";

const Root = () => {
  useKeybindings();
  return (
    <ProjectsContextProvider>
      <div
        className="w-full bg-customBG text-customText relative"
      >
        <Navbar />
        <Outlet />
        <LoginModal />
      </div>
    </ProjectsContextProvider>
  );
};

export default Root;
