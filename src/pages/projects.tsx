import ProjectCard from "@/components/project/card";

import { useEffect } from "react";
import useProjects from "@/hooks/useProjects.tsx";

const ProjectsPage = () => {
  const { projects, refetch } = useProjects();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-full flex flex-col gap-8 md:gap-4 px-8  w-full  md:w-auto md:max-w-[60rem] pt-14 m-auto">
      {projects.map((project) => (
        <ProjectCard project={project} key={project?.id} />
      ))}
    </div>
  );
};

export default ProjectsPage;
