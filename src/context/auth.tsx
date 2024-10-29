import { Auth } from "@/types/auth";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("pk-tk");
    if (token && !auth) {
      setAuth(token);
    }
  }, [auth]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("pk-tk");
    setAuth(null);
  }, []);

  const handleLogin = useCallback((token: string) => {
    setAuth(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ data: auth, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
