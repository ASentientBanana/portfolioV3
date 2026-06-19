import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Button } from "../ui/button";
import { CreateProjectModalContext } from "@/context/createModal";
import { AdminProjectContext } from "@/context/adminProjects";
import { useLocation } from "react-router-dom";
import { CreateEmptyProject } from "@/util/project";

type Props = {
  onSave?: () => void;
};

const AdminNav = ({ onSave }: Props) => {
  const location = useLocation();

  const auth = useContext(AuthContext);
  const create = useContext(CreateProjectModalContext);
  const { isRestructuring, toggleRestructure } =
    useContext(AdminProjectContext);
  const isOnProjectsPage = location.pathname === "/admin/projects";

  return (
    <nav className="bg-customBG absolute top-0 w-full flex justify-between px-5 border-1 border-solid border-customText pt-2">
      <Button type="button" onClick={auth?.logout} className="text-customText">
        Logout
      </Button>
      <div className="flex gap-4">
        {isOnProjectsPage && (
          <Button
            variant={isRestructuring ? "destructive" : "default"}
            type="button"
            onClick={toggleRestructure}
          >
            Restructure projects
          </Button>
        )}
        {isOnProjectsPage && (
          <Button onClick={onSave} type="submit" className="text-customText">
            Save positions
          </Button>
        )}
        <Button
          onClick={() => create.openModal(CreateEmptyProject())}
          type="button"
          className="text-customText"
        >
          Create
        </Button>
      </div>
    </nav>
  );
};

export default AdminNav;
