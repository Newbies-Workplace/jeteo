"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AuthRoot = ({
  children,
  loader: Loader = <div>Loading...</div>,
}: {
  children: React.ReactNode;
  loader?: React.ReactNode;
}) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);

  return status === "loading" ? Loader : <div>{children}</div>;
};

export default AuthRoot;
