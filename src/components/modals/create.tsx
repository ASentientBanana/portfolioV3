import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { CreateProjectModalContext } from "@/context/createModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { httpInstance } from "@/main";
import { toast } from "../ui/use-toast";
import useProjects from "@/hooks/useProjects";
import { Textarea } from "../ui/textarea";
import { Project } from "@/types/projects";

export function CreateProjectModal() {
  const {
    project: _project,
    closeModal,
    openModal,
  } = useContext(CreateProjectModalContext);
  const [project, setProject] = useState<Project | null>();
  const formRef = useRef<HTMLFormElement>(null);
  const { refetch } = useProjects();

  useEffect(() => {
    if (typeof _project !== "undefined") {
      setProject(_project);
    }
  }, [_project]);

  // Project states
  //  undefined closed; null create Project; project provided is editing project;
  const isCreate = _project === null;

  const setInputValue = (key: keyof Project, value: string) => {
    if (!project) {
      return;
    }
    // const x: Project = { ...project };
    setProject({ ...project, [key]: value });
  };

  const validate = (fd: FormData): boolean => {
    const reg = new RegExp("^[0-9]$");
    if (!reg.test((fd.get("position") as string) ?? "")) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(project);

    // if (isCreate) {
    //   createProject();
    // } else {
    //   updateProject();
    // }
  };

  useEffect(() => {
    console.log(project);
    console.log(_project);
  }, [_project, project]);

  const updateProject = async () => {
    if (!formRef.current) {
      return;
    }
  };

  const createProject = async () => {
    if (!formRef.current) {
      return;
    }
    const fd = new FormData(formRef.current);

    const isValid = validate(fd);
    if (!isValid) {
      return;
    }

    const response = await httpInstance.post("/projects", fd, {
      headers: {
        Authorization: "",
      },
    });
    if (response.status !== 200) {
      toast({
        description: "Something went wrong",
      });
      return;
    }
    closeModal();
    formRef.current.reset();
    refetch();
  };

  const handleSubmitButtonClick = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Dialog
      // open={(project === null || !!project) && typeof project !== "undefined"}
      open={!!project}
      defaultOpen={false}
      onOpenChange={(_open) => {
        if (_open) {
          if (typeof project !== "undefined") {
            openModal(project);
          }
        } else {
          closeModal();
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-customBG border-customText text-customText">
        <DialogHeader>
          <DialogTitle className="text-customText">Admin login</DialogTitle>
        </DialogHeader>
        <form
          className=" flex flex-col gap-4 text-[black]"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input
            value={project?.name}
            onChange={(v) => setInputValue("name", v.target.value)}
            placeholder="name"
            name="name"
          />
          <Textarea
            placeholder="description"
            value={project?.description}
            onChange={(v) => setInputValue("description", v.target.value)}
            name="description"
          />
          <Input
            value={project?.live}
            onChange={(v) => setInputValue("live", v.target.value)}
            type="url"
            placeholder="live"
            name="live"
          />
          <Input
            value={project?.github}
            onChange={(v) => setInputValue("github", v.target.value)}
            type="url"
            placeholder="github"
            name="github"
          />
          <Input
            value={project?.position}
            onChange={(v) => setInputValue("position", v.target.value)}
            placeholder="position"
            name="position"
            type="number"
          />
          <Input
            value={project?.stack}
            onChange={(v) => setInputValue("stack", v.target.value)}
            placeholder="Stack"
            name="stack"
            type="text"
          />
          <Input
            value={project?.image}
            onChange={(v) => setInputValue("image", v.target.value)}
            className="text-[white]"
            name="image"
            type="file"
          />
        </form>
        <DialogFooter className="sm:justify-end ">
          <Button onClick={handleSubmitButtonClick} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
