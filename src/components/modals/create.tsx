import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEvent, useContext, useRef } from "react";
import { CreateProjectModalContext } from "@/context/createModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { httpInstance } from "@/main";
import { toast } from "../ui/use-toast";
import useProjects from "@/hooks/useProjects";
import { Textarea } from "../ui/textarea";

export function CreateProjectModal() {
  const { open, closeModal, openModal } = useContext(CreateProjectModalContext);
  const { refetch } = useProjects();

  const formRef = useRef<HTMLFormElement>(null);

  const validate = (fd: FormData): boolean => {
    const reg = new RegExp("^[0-9]$");
    if (!reg.test((fd.get("position") as string) ?? "")) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      return;
    }
    const fd = new FormData(formRef.current);

    const isValid = validate(fd);
    if (!isValid) {
      return;
    }

    const response = await httpInstance.post("/projects", fd);
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
      open={open}
      onOpenChange={(_open) => {
        if (_open) {
          openModal();
        } else {
          closeModal();
        }
      }}
    >
      <DialogContent className="sm:max-w-md bg-customBG border-customText text-customText">
        <DialogHeader>
          <DialogTitle className="text-customText">Admin login</DialogTitle>
        </DialogHeader>
        <form className="text-[black]" ref={formRef} onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <Input placeholder="name" name="name" />
            <Textarea placeholder="description" name="description" />
            <Input type="url" placeholder="live" name="live" />
            <Input type="url" placeholder="github" name="github" />
            <Input placeholder="position" name="position" type="number" />
            <Input placeholder="Stack" name="stack" type="text" />
            <Input className="text-[white]" name="image" type="file" />
          </div>
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
