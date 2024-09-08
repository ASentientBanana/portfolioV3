import AdminProjectList from "@/components/adminProjectList";
import AdminNav from "@/components/nav/adminNav";
import { toast } from "@/components/ui/use-toast";
import { httpInstance } from "@/main";
import { Project } from "@/types/projects";
import { useEffect, useRef } from "react";
import useProjects from "@/hooks/useProjects.tsx";

const ProjectsAdmin = () => {
  const { projects, refetch, setProjects } = useProjects();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData();

    for (let i = 0; i < projects.length; i++) {
      const _project = projects[i];

      for (const [key, value] of Object.entries(_project)) {
        fd.set(`f${i}-${key}`.toLowerCase(), value?.toString());
      }
    }

    if (formRef.current) {
      const _fd = new FormData(formRef.current);
      for (const [key, value] of _fd.entries()) {
        if (value instanceof File && value.size > 0) {
          fd.set(key.toLowerCase(), value);
        }
      }
    }

    fd.set("items", projects.length.toString());

    try {
      await httpInstance.put<{ projects: Project[] }>("/projects", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await refetch();

      toast({
        description: "Success",
      });
    } catch (error) {
      toast({
        description: "Problem updating projects.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="relative h-[100vh] bg-customBG overflow-hidden overflow-y-auto"
    >
      <AdminNav />
      <AdminProjectList projects={projects} setProjects={setProjects} />
    </form>
  );
};

export default ProjectsAdmin;
