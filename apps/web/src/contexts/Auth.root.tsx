'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth.hook";
import { redirect } from 'next/navigation';

const AuthRoot = ({ children, loader: Loader = <div>Loading...</div> }) => {
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authContext.fetchUser();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchData();
    }
  }, [authContext, isLoading]);

  return isLoading ? Loader :
    authContext.user ? <div>{children}</div> : redirect("/../");
};

export default AuthRoot;