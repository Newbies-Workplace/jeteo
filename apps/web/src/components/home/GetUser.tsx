"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";

export const GetUser: React.FC = () => {
  const { user } = useAuth();

  const name = user ? user?.nick.split(" ")[0] : "Użytkowniku";

  return <>{name}</>;
};
