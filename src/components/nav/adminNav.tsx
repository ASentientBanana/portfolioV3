import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Button } from "../ui/button";
import { CreateProjectModalContext } from "@/context/createModal";

const AdminNav = () => {
  const auth = useContext(AuthContext);
  const create = useContext(CreateProjectModalContext);

  return (
    <nav className="bg-customBG absolute top-0 w-full flex justify-between px-5 border-1 border-solid border-customText">
      <Button type="button" onClick={auth?.logout} className="text-customText">
        Logout
      </Button>
      <div>
        <Button type="submit" className="text-customText">
          Save
        </Button>
        <Button
          onClick={create.openModal}
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
