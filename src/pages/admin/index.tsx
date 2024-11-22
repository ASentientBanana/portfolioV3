import { CreateProjectModal } from "@/components/modals/create";
import { AuthContext } from "@/context/auth";
import { ModalCreateProjectModalProvider } from "@/context/createModal";
import { ProjectsContextProvider } from "@/context/projects";
import { httpInstance } from "@/main";
import { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  const auth = useContext(AuthContext);
  if (!auth?.data) {
    return <Navigate to={"/admin/login"} />;
    // if (!token) {
    //   return <Navigate to={"/"} />;
    // } else {
    //   auth?.login(token);
    // }
  }

  httpInstance.interceptors.request.use(async (config) => {
    if (!config.headers.Authorization && auth?.data) {
      config.headers.Authorization = `Bearer ${auth?.data}`;
    }

    return config;
  });

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
