
import { httpInstance } from "@/main";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="z-40 px-5 py-3 flex justify-between sticky top-0 bg-custom bg-customBG">
      {location.pathname.includes("projects") ? (
        <button>
          <ArrowLeft onClick={() => navigate("/", { replace: true })} />
        </button>
      ) : (
        <div />
      )}
      <Link target="#" to={httpInstance.defaults.baseURL + "download/resume.pdf"}>
        <span className="[&.active]:font-bold">Resume / CV</span>
      </Link>
    </div>
  );
};

export default Navbar;
