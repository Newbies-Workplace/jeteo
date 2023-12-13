"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDetailsResponse } from "shared/model/user/response/user.response";
import { myFetch } from "@/common/fetch";

interface AuthContext {
  fetchUser: () => Promise<void>;
  logout: () => void;
  user: UserDetailsResponse | null;
}

export const AuthContext = createContext<AuthContext>({
  fetchUser: async () => {},
  logout: async () => {},
  user: null,
});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserDetailsResponse | null>(null);

  useEffect(() => {
    if (!!Cookies.get("token") && !user) {
      fetchUser();
    }
  }, [user]);

  const fetchUser = async () => {
    const user: UserDetailsResponse = await myFetch("/rest/v1/users/@me").then(
      (res) => res.json()
    );
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
