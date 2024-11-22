import { AuthContext } from "@/context/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const LoginForm = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:9898/login", {
        method: "POST",
        body: JSON.stringify({ Username: username, Password: password }),
      });
      const data = await response.json();
      if (!data.token) {
        throw Error("No token found.");
      }
      authContext?.login(data.token);
      navigate("/admin/projects");
    } catch (error) {
      toast({
        description: "Problem logging in.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Input
          className="bg-customBG text-customText"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="bg-customBG text-customText"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default LoginForm;
