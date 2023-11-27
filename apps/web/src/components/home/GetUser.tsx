"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";

export const GetUser: React.FC = () => {
  const { user } = useAuth();

  const name = user?.name?.split(" ")?.[0] ?? "użytkowniku!";

  return <>{name}</>;
};
