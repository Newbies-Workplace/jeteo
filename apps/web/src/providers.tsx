"use client";

import { AuthContextProvider } from "./contexts/Auth.context";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};
