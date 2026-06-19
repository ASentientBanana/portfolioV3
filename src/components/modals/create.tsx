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
import { Textarea } from "../ui/textarea";
import { Project } from "@/types/projects";
import { Description } from "@radix-ui/react-toast";
import { ProjectsContext } from "@/context/projects";
import DeleteProjectButton from "../deleteProjectButton";
import { toast } from "../ui/use-toast";
import { httpInstance } from "@/main";

export function CreateProjectModal() {
  const { project: _project, closeModal } = useContext(
    CreateProjectModalContext,
  );
  const { refetch } = useContext(ProjectsContext);
  const [project, setProject] = useState<Project | null>();
  const formRef = useRef<HTMLFormElement>(null);
  const isNewProjectRef = useRef(true);

  useEffect(() => {
    if (!_project) {
      setProject(null);
      return;
    }
    setProject(_project);
    isNewProjectRef.current = project?.id === -1 && false;

    return;
  }, [_project]);

  const setInputValue = (key: keyof Project, value: string) => {
    if (!project) {
      return;
    }
    // const x: Project = { ...project };
    setProject({ ...project, [key]: value });
  };

  useEffect(() => {}, [_project, project]);

  const handleSubmitButtonClick = () => {
    formRef.current?.requestSubmit();
  };

  const validateFormData = (fd: FormData): boolean => {
    for (const [key, val] of fd.entries()) {
      if (key === "live" || key === "github" || key === "image") {
        continue;
      }
      if (!val) {
        toast({
          variant: "destructive",
          description: `Invalid form:\n missing field "${key}"`,
        });
        return false;
      }
      if (key === "image" && project?.id === -1) {
        const f = val as File;
        if (f.size === 0) {
          toast({
            variant: "destructive",
            description: "Invalid form: image not selected",
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleProjectUpdate = async (fd: FormData) => {
    if (project?.id === -1) {
      return;
    }
    try {
      const res = await httpInstance.put("projects/" + project?.id, fd);
      if (res.status !== 200) {
        toast({ description: "Problem updating the project" });
        return;
      }
    } catch (e) {
      console.error(e);
      toast({ description: "Problem updating the project" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const isValid = validateFormData(fd);

    if (!isValid) {
      return;
    }

    if ((fd.get("image") as File).size === 0) {
      fd.delete("image");
    }

    try {
      if (_project?.id === -1) {
        await httpInstance.post("/projects", fd);
      } else {
        await handleProjectUpdate(fd);
      }
      refetch();
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={!!project} defaultOpen={false}>
      <DialogContent className="sm:max-w-md bg-customBG border-customText text-customText">
        <DialogHeader>
          <DialogTitle className="text-customText"></DialogTitle>
        </DialogHeader>
        <Description></Description>

        <form
          className=" flex flex-col gap-4 text-[black]"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input
            value={project?.name ?? ""}
            onChange={(v) => setInputValue("name", v.target.value)}
            placeholder="name"
            name="name"
          />
          <Textarea
            placeholder="description"
            value={project?.description ?? ""}
            onChange={(v) => setInputValue("description", v.target.value)}
            name="description"
          />
          <Input
            value={project?.live ?? ""}
            onChange={(v) => setInputValue("live", v.target.value)}
            type="url"
            placeholder="live"
            name="live"
          />
          <Input
            value={project?.github ?? ""}
            onChange={(v) => setInputValue("github", v.target.value)}
            type="url"
            placeholder="github"
            name="github"
          />
          <Input
            value={project?.position ?? ""}
            onChange={(v) => setInputValue("position", v.target.value)}
            placeholder="position"
            name="position"
            type="number"
          />
          <Input
            value={project?.stack ?? ""}
            onChange={(v) => setInputValue("stack", v.target.value)}
            placeholder="Stack"
            name="stack"
            type="text"
          />

          <Input
            onChange={(v) => setInputValue("image", v.target.value)}
            className="text-[white]"
            name="image"
            type="file"
          />
        </form>
        <DialogFooter className="sm:justify-between ">
          <Button
            onClick={() => {
              console.log("Cancel");
              // setProject(undefined)
              closeModal();
            }}
            type="submit"
          >
            Cancel
          </Button>

          {_project?.id !== -1 && (
            <DeleteProjectButton
              id={_project?.id as number}
              onComplete={closeModal}
            />
          )}
          <Button onClick={handleSubmitButtonClick} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
