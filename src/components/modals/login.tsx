import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AuthModalContext } from "@/context/authModal";
import { toast } from "../ui/use-toast";
import { AuthContext } from "@/context/auth";
import { useNavigate } from "react-router-dom";

export function LoginModal() {
  const { open, closeModal, openModal } = useContext(AuthModalContext);
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
      <DialogContent className="max-w-sm sm:max-w-md bg-customBG border-customText text-customText">
        <DialogHeader>
          <DialogTitle className="text-customText">Admin login</DialogTitle>
        </DialogHeader>
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
        <DialogFooter className="sm:justify-end gap-4">
          <DialogClose asChild>
            <Button disabled={isLoading} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            type="button"
            variant="secondary"
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
