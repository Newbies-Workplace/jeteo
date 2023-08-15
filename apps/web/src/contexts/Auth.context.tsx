'use client';

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserResponse } from "shared/model/user/response/user.response";
import { myFetch } from "@/common/fetch";

interface AuthContext {
  fetchUser: () => Promise<void>;
  user: UserResponse | null;
}

export const AuthContext = createContext<AuthContext>({
  fetchUser: async () => {},
  user: null,
});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    if (!Cookies.get('token') && !user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const user: UserResponse = await myFetch('/rest/v1/users/@me').then((res) =>
      res.json(),
    );

    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
