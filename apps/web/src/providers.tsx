'use client';

import { AuthContextProvider } from "./contexts/Auth.context";

export const Providers = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
