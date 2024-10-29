import { Project } from "@/types/projects";
import { createContext, useCallback, useState } from "react";

type ProjectContext = Project | null | undefined;

type ModalContextType = {
  project: ProjectContext;
  openModal: (_: Project | null) => void;
  closeModal: () => void;
};

export const CreateProjectModalContext = createContext<ModalContextType>({
  project: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalCreateProjectModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<ProjectContext>();

  const openModal = useCallback((project: Project | null) => {
    console.log(project);
    if (!project) {
      return;
    }
    setProject(project);
  }, []);

  const closeModal = useCallback(() => {
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
