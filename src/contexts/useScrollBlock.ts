import { useEffect } from "react";

export const useScrollBlock = (): void => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
};
