import { createContext, useCallback, useState } from "react";

type ModalContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const CreateProjectModalContext = createContext<ModalContextType>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalCreateProjectModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setIsOpenModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    console.log("OPEN");

    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <CreateProjectModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </CreateProjectModalContext.Provider>
  );
};
