"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth.hook";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const AuthRoot = ({ children, loader: Loader = <div>Loading...</div> }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !!Cookies.get("token") ? setIsLoading(!user) : redirect("/../");
  }, [user, isLoading]);

  return isLoading ? Loader : <div>{children}</div>;
};

export default AuthRoot;
