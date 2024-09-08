import { createContext, useCallback, useState } from "react";

type ModalContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const AuthModalContext = createContext<ModalContextType>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setIsOpenModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <AuthModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
