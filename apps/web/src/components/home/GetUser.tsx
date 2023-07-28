"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";

export const GetUser: React.FC = () => {
  const { user } = useAuth();
  const name  = user?.nick.split(" ")[0]

  return (
    <span>{name}</span>
  );
};