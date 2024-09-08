import { CreateProjectModal } from "@/components/modals/create";
import { AuthContext } from "@/context/auth";
import { ModalCreateProjectModalProvider } from "@/context/createModal";
import { ProjectsContextProvider } from "@/context/projects";
import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  const auth = useContext(AuthContext);

  if (!auth?.data) {
    return <Navigate to={"/"} />;
  }

  return (
    <ProjectsContextProvider>
      <ModalCreateProjectModalProvider>
        <Outlet />
        <CreateProjectModal />
      </ModalCreateProjectModalProvider>
    </ProjectsContextProvider>
  );
};

export default Admin;
