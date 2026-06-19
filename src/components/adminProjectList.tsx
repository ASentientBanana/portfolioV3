import { Project } from "@/types/projects";
import { useContext, useEffect, useRef, useState } from "react";
import { CreateProjectModalContext } from "@/context/createModal";
import { httpInstance } from "@/main";

import { AdminProjectContext } from "@/context/adminProjects";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const AdminProjectList = ({
  projects: unsortedProjects,
  setProjects: setRootProjects,
}: Props) => {
  const { isRestructuring } = useContext(AdminProjectContext);

  const [projects, setProjects] = useState<Project[]>([]);
  const { openModal } = useContext(CreateProjectModalContext);
  const [selectedProject, setSelectedProject] = useState<number>(-1);
  const changeRef = useRef(0);

  useEffect(() => {
    setProjects([...unsortedProjects].sort((a, b) => a.position - b.position));
  }, [unsortedProjects]);

  useEffect(() => {
    if (isRestructuring || changeRef.current === 0) {
      return;
    }
    changeRef.current = 0;
    setProjects(unsortedProjects);
  }, [isRestructuring, projects, setRootProjects, unsortedProjects]);

  useEffect(() => {
    if (isRestructuring) {
      return;
    }

    setSelectedProject(-1);
    setRootProjects(projects);
  }, [isRestructuring]);

  const handleProjectSelect = (project: Project) => {
    openModal(project);
  };

  const handleMouseUp = (i: number, project: Project) => {
    if (isRestructuring) {
      if (selectedProject === i) {
        setSelectedProject(-1);
        return;
      }
      if (selectedProject! >= 0) {
        const p: Project[] = [...projects];
        const pp = p[i].position;
        p[i].position = p[selectedProject].position;
        p[selectedProject].position = pp;
        [p[i], p[selectedProject]] = [p[selectedProject], p[i]];
        setProjects(p);
        changeRef.current += 1;
        setSelectedProject(-1);
      } else {
        setSelectedProject(i);
      }
      return;
    }
    handleProjectSelect(project);
  };

  return (
    <div className="pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 m-auto w-[80%] mt-10 pt-10 palce-items-center gap-3">
        {projects.map((project, i) => {
          const isSelected = selectedProject === i;
          return (
            <div key={project.id} className={cn("flex flex-col gap-2")}>
              <div
                className={cn(
                  "cursor-pointer shadow-[#f7f6e4] flex flex-col gap-4 items-center justify-start p-4 relative transition duration-300",
                  {
                    "translate-y-3": isSelected,
                    "translate-x--8": isSelected,
                    "shadow-[0px_0px_10px_0px]": isSelected,
                  },
                )}
                onMouseUp={() => handleMouseUp(i, project)}
                key={`${project?.id}-${project.name}`}
              >
                <img
                  className="h-[11rem] w-full object-contain"
                  alt="NO IMAGE PROVIDED"
                  src={httpInstance.defaults.baseURL + project.image}
                />
                <div className="bg-customBG absolute bottom-0 h-[2rem] w-full flex justify-center">
                  <span className="text-white">
                    {project.name}-{project.position}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProjectList;
