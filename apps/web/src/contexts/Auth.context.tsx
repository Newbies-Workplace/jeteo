"use client";

import React, { createContext, useState } from "react";

interface UserResponse {
  id: string;
}

interface AuthContext {
  user: UserResponse | null;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserResponse>();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
