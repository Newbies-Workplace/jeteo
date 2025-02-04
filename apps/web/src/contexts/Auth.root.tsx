"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth.hook";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthRoot = ({
  children,
  loader: Loader = <div>Loading...</div>,
}: {
  children: React.ReactNode;
  loader?: React.ReactNode;
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!!Cookies.get("token")) {
      setIsLoading(!user);
    } else {
      router.replace("/");
    }
  }, [user, isLoading]);

  return isLoading ? Loader : <div>{children}</div>;
};

export default AuthRoot;
