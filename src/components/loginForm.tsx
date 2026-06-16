import { AuthContext } from "@/context/auth";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { httpInstance } from "@/main";

const LoginForm = () => {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await httpInstance.post("/login", {
        username,
        password,
      });
      if (response.status !== 200 || !response.data.token) {
        throw Error("Problem logging in");
      }

      authContext?.login(response.data.token);
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
    <main className=" mx-auto mt-[5rem] flex items-center justify-center gap-4 relative h-[50vh] sm:h-[28rem] bg-customBG sm:shadow-[35px_30px_0px_0px] sm:shadow-primary rounded-none  w-full sm:w-[600px]  sm:bg-[#f7f6e4] border-none`">
      <form className="w-[80%] flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="m-auto font-bold text-4xl text-customBG">Welcome</h1>
        <Input
          className="bg-transparent border-customBG text-customBG"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="bg-transparent text-customBG border-customBG"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default LoginForm;
