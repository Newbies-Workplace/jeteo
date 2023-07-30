"use client";

import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// todo - move to shared
export interface UserResponse {
  id: string;
  nick: string;
}

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
    if (!Cookies.get("token") && !user) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const response = await fetch(
      "http://127.0.0.1:3001/api/rest/v1/users/@me",
      { credentials: "include" }
    );
    const user: UserResponse = await response.json();
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
