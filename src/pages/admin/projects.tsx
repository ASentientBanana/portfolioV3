import AdminProjectList from "@/components/adminProjectList";
import AdminNav from "@/components/nav/adminNav";
import { toast } from "@/components/ui/use-toast";
import { httpInstance } from "@/main";
import { useContext, useEffect, useRef } from "react";
import useProjects from "@/hooks/useProjects.tsx";
import { AuthContext } from "@/context/auth.tsx";

const ProjectsAdmin = () => {
  const { projects, refetch, setProjects } = useProjects();
  const formRef = useRef<HTMLFormElement | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // const handleSubmit = async () => {
  //   const fd = new FormData();

  //   for (let i = 0; i < projects.length; i++) {
  //     const _project = projects[i];

  //     for (const [key, value] of Object.entries(_project)) {
  //       fd.set(`f${i}-${key}`.toLowerCase(), `${value}`);
  //     }
  //   }

  //   if (formRef.current) {
  //     const _fd = new FormData(formRef.current ?? undefined);
  //     for (const [key, value] of _fd.entries()) {
  //       if (value instanceof File && value.size > 0) {
  //         console.info("Setting:: ", value);
  //         fd.set(key.toLowerCase(), value);
  //       }
  //     }
  //   }

  //   for (const [key, val] of fd.entries()) {
  //     console.log(`${key}-${val}`);
  //   }
  //   return;
  //   try {
  //     await httpInstance.put<{ projects: Project[] }>("/projects", fd, {
  //       headers: {
  //         Authorization: auth?.data ?? "",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     await refetch();
  //     console.log("Success");
  //     toast({
  //       description: "Success",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       variant: "destructive",
  //       description: "Problem updating projects.",
  //     });
  //   }
  // };

  const handleUpdatePositions = async () => {
    const len = projects.length;
    const body: { positions: { id: number; position: number }[] } = {
      positions: [],
    };
    for (let p = 0; p < len; p++) {
      if (!projects[p]?.id) {
        continue;
      }
      body.positions.push({
        id: projects[p].id!,
        position: projects[p].position,
      });
    }

    try {
      httpInstance.put("/projects/positions", body);
    } catch (e) {
      console.error("Problem updating positions");
      console.error(e);
    }
  };

  const handleSave = () => {
    const save = window.confirm("Changes to the projects about to be saved.");
    if (save && formRef.current) {
      handleUpdatePositions();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e?.preventDefault();
        handleSave();
      }}
      ref={formRef}
      className="relative h-[100vh] bg-customBG overflow-hidden overflow-y-auto"
    >
      <AdminNav />
      <AdminProjectList projects={projects} setProjects={setProjects} />
    </form>
  );
};

export default ProjectsAdmin;
