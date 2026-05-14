import { Project } from "@/types/projects";
import ProjectCard from "./project/card";
import { useContext } from "react";
import { CreateProjectModalContext } from "@/context/createModal";
import { httpInstance } from "@/main";

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
    <div className="grid grid-cols-4 m-auto w-[80%] mt-10 pt-10 palce-items-center ">
      {projects.map((project) => (
        <div
          className="cursor-pointer  flex flex-col gap-4 items-center justify-start p-4"
          onClick={() => handleProjectSelect(project)}
          key={project?.id}
        >
          <img className="h-20 w-20" alt="NO IMAGE PROVIDED" src={httpInstance.defaults.baseURL + project.image} />
          <span className="text-white">{project.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminProjectList;
