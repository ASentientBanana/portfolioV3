import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Project } from "@/types/projects";
import { useEffect, useState } from "react";
import AdminEditField from "./adminEditField";
import { Button } from "../ui/button";
import { httpInstance } from "@/main";
import DeleteProjectButton from "../deleteProjectButton";
import { Input } from "../ui/input";

type Props = {
  project: Project;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  index: number;
};

const ProjectAdminCard = ({ project: _project, setProjects, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [project, setProject] = useState(_project);

  useEffect(() => {
    setProject(_project);
  }, [_project]);

  const toggle = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing((e) => !e);
  };

  const handleSave = () => {
    setProjects((_projects) => {
      const projects = [..._projects];
      const index = _projects.findIndex((p) => p.id === project?.id);
      if (index >= 0) {
        projects[index] = project;
      }
      return projects;
    });
  };

  const handleOnFieldChange = (input: string, field: keyof Project) => {
    setProject((p) => ({ ...p, [field]: input }));
  };

  return (
    <Card className="w-80 text-[white] bg-customSecondary">
      <CardHeader>
        <div className="flex w-full justify-between">
          <AdminEditField
            field="name"
            type="text"
            isEditing={isEditing}
            set={handleOnFieldChange}
            value={project?.name}
          />
          <DeleteProjectButton id={project?.id} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5">
          <img
            src={`${httpInstance.defaults.baseURL}${project?.image}`}
            alt="No image"
          />
          <Input type="file" name={`f${index}-image`} id={`f${index}-image`} />
        </div>
        <AdminEditField
          type="textarea"
          field="description"
          isEditing={isEditing}
          set={handleOnFieldChange}
          value={project?.description}
        />

        <AdminEditField
          field="stack"
          type="text"
          isEditing={isEditing}
          set={handleOnFieldChange}
          value={project?.stack}
        />
      </CardContent>
      <CardFooter className="flex flex-col justify-start">
        <div
          className={`w-full ${isEditing ? "flex-col" : "flex-row"} flex justify-evenly`}
        >
          <AdminEditField
            field="github"
            type="url"
            isEditing={isEditing}
            set={handleOnFieldChange}
            value={project?.github}
          />
          <AdminEditField
            field="live"
            type="url"
            isEditing={isEditing}
            set={handleOnFieldChange}
            value={project?.live}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <Button type="button" onClick={toggle}>
            {!isEditing ? "Edit" : "Save"}
          </Button>
          {isEditing && (
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectAdminCard;
