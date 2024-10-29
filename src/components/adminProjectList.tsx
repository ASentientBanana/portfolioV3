import { Project } from "@/types/projects";
import ProjectCard from "./project/card";
import { useContext } from "react";
import { CreateProjectModalContext } from "@/context/createModal";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};
// TODO(petar): setProjects is missing
const AdminProjectList = ({ projects }: Props) => {
  const { openModal } = useContext(CreateProjectModalContext);

  const handleProjectSelect = (project: Project) => {
    openModal(project);
  };
  return (
    <div className="flex flex-col justify-evenly gap-4 px-5 py-12 w-[80%] md:w-auto md:max-w-[80rem] m-auto">
      {projects.map((project) => (
        <div
          className="cursor-pointer"
          onClick={() => handleProjectSelect(project)}
          key={project?.id}
        >
          <ProjectCard project={project} key={project?.id} />
        </div>
      ))}
    </div>
  );
};

export default AdminProjectList;
