import { AuthModalContext } from "@/context/authModal";
import { useCallback, useContext, useEffect, useRef } from "react";

type KeyItem = {
  timestamp: number;
  key: string;
};

const useKeybindings = () => {
  const keyref = useRef<KeyItem[]>([]);
  const modalContext = useContext(AuthModalContext);

  const isValidKeybind = useCallback(() => {
    const targets = ["p", "k"];
    const found = keyref.current.reduce(
      (prev, item) => prev + (targets.includes(item.key) ? 1 : 0),
      0,
    );
    return found === targets.length;
  }, []);

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      keyref.current.push({
        timestamp: Date.now(),
        key: ev.key,
      });
      if (keyref.current.length > 2) {
        keyref.current.shift();
      }
      if (keyref.current.length === 2) {
        const res = keyref.current[1].timestamp - keyref.current[0].timestamp;
        if (res < 10 && isValidKeybind()) {
          modalContext.openModal();
        }
      }
    },
    [modalContext],
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeyDown);
    return () => document.removeEventListener("keypress", handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeybindings;
