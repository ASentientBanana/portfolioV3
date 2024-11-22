import ProjectCard from "@/components/project/card";

import { useEffect } from "react";
import useProjects from "@/hooks/useProjects.tsx";

const ProjectsPage = () => {
  const { projects, refetch } = useProjects();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col gap-8 md:gap-4 px-8 py-2 w-full  md:w-auto md:max-w-[60rem] m-auto overflow-auto">
      {projects.map((project) => (
        <ProjectCard project={project} key={project?.id ?? project?.name} />
      ))}
    </div>
  );
};

export default ProjectsPage;
