import ProjectCard from "@/components/project/card";

import { useEffect, useState } from "react";
import useProjects from "@/hooks/useProjects.tsx";
import { Project } from "@/types/projects";

const ProjectsPage = () => {
  const { projects: sourceProjects, refetch } = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const p = [...sourceProjects].sort((a, b) => a.position - b.position);
    console.log(p);
    setProjects(p);
  }, [sourceProjects]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col gap-8 md:gap-4 px-8 py-5 w-full  md:w-auto md:max-w-[60rem] m-auto overflow-auto">
      {projects.map((project) => (
        <ProjectCard project={project} key={project?.id ?? project?.name} />
      ))}
    </div>
  );
};

export default ProjectsPage;
