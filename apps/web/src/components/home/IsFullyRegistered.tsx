"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";
import { Text } from "@/components/text/Text";

export const IsFullyRegistered: React.FC = () => {
  const { user } = useAuth();

  return(
    <div style={{backgroundColor: "#080736", width: "100%", color: "white", height: "50px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Text>Dokoncz rejestracje</Text>;
    </div>
  )
};
