import { Project } from "@/types/projects";
import { createContext, useCallback, useState } from "react";

type ProjectContext = Project | undefined;

type ModalContextType = {
  project: ProjectContext;
  openModal: (_: Project) => void;
  closeModal: () => void;
};

export const CreateProjectModalContext = createContext<ModalContextType>({
  project: undefined,
  openModal: (_: Project) => { },
  closeModal: () => { },
});

export const ModalCreateProjectModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<ProjectContext>();

  const openModal = useCallback((project: Project) => {

    setProject(project);
  }, []);

  const closeModal = useCallback(() => {
    console.log('Closing modal')
    setProject(undefined);
  }, []);

  return (
    <CreateProjectModalContext.Provider
      value={{ project, openModal, closeModal }}
    >
      {children}
    </CreateProjectModalContext.Provider>
  );
};
