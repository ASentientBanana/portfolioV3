import { Auth } from "@/types/auth";
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext<Auth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<string | null>(null);

  const handleLogout = useCallback(() => {
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
