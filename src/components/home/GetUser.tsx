"use client";

import React from "react";
import { useSession } from "next-auth/react";

export const GetUser: React.FC = () => {
  const { data } = useSession();
  const user = data?.user;

  const name = user?.name?.split(" ")?.[0] ?? "użytkowniku!";

  return <>{name}</>;
};
