import { Project } from "@/types/projects";
import ProjectAdminCard from "./project/adminCard";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const AdminProjectList = ({ projects, setProjects }: Props) => {
  return (
    <div className="flex  flex-wrap justify-evenly flex-row gap-4 px-5 py-12 w-[80%] md:w-auto md:max-w-[80rem] m-auto">
      {projects.map((project, index) => (
        <ProjectAdminCard
          index={index}
          key={project.id}
          setProjects={setProjects}
          project={project}
        />
      ))}
    </div>
  );
};

export default AdminProjectList;
