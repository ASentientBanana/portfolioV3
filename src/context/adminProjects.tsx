import { createContext, useCallback, useState } from "react";

type ModalContextType = {
  isRestructuring: boolean
  toggleRestructure: () => void,
};

export const AdminProjectContext = createContext<ModalContextType>({
  isRestructuring: false,
  toggleRestructure: () => { }
});

export const AdminProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRestructuring, setIsRestructuring] = useState(false)

  const toggleRestructure = useCallback(() => {
    setIsRestructuring(b => !b)
  }, []);

  return (
    <AdminProjectContext.Provider value={{ isRestructuring, toggleRestructure }}>
      {children}
    </AdminProjectContext.Provider>
  );
};
