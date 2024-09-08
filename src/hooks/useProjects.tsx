import { ProjectsContext } from "@/context/projects";
import { useContext } from "react";

const useProjects = () => {
  const context = useContext(ProjectsContext);

  return {
    ...context,
  };
};
export default useProjects;
