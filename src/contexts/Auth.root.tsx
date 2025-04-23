"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthRoot = ({
  children,
  loader: Loader = <div>Loading...</div>,
}: {
  children: React.ReactNode;
  loader?: React.ReactNode;
}) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return redirect("/");
  }

  return status === "loading" ? Loader : <div>{children}</div>;
};

export default AuthRoot;
