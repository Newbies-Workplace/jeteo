import { AuthContext } from "./Auth.context";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
