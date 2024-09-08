import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { httpInstance } from "@/main";
import useProjects from "@/hooks/useProjects";

const DeleteProjectButton = ({ id }: { id: string | number }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useProjects();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await httpInstance.delete(`/projects/${id}`);
      console.log("done?");

      await refetch();
    } catch (error) {
      toast({ description: "Problem deleting projects." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-7">
      {!isConfirming && (
        <Button onClick={() => setIsConfirming(true)}> Delete</Button>
      )}
      {isConfirming && (
        <Button
          disabled={isLoading}
          onClick={handleDelete}
          className="bg-green-500"
        >
          Confirm
        </Button>
      )}
      {isConfirming && (
        <Button
          disabled={isLoading}
          onClick={() => setIsConfirming(false)}
          className="bg-red-500"
        >
          Deny
        </Button>
      )}
    </div>
  );
};

export default DeleteProjectButton;
