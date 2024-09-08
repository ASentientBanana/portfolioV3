import { useToast } from "@/components/ui/use-toast";
import { httpInstance } from "@/main";
import { Project } from "@/types/projects";
import { useCallback, createContext, useState, Dispatch } from "react";

type ProjectsContextType = {
  projects: Project[];
  refetch: () => Promise<void>;
  isLoading: boolean;
  setProjects: Dispatch<React.SetStateAction<Project[]>>;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  refetch: async () => {},
  isLoading: false,
  setProjects: () => {},
});

export const ProjectsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const getAllProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await httpInstance.get<{ projects: Project[] }>(
        "/projects"
      );

      setProjects(response.data.projects);
    } catch (error) {
      toast({
        description: "Problem getting projects from server.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <ProjectsContext.Provider
      value={{
        setProjects,
        projects,
        refetch: getAllProjects,
        isLoading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
