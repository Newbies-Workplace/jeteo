"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";
import { Text } from "@/components/atoms/text/Text";

export const IsFullyRegistered: React.FC = () => {
  const { user } = useAuth();

  {
    /* TODO: dodac tu komponent z karteckzami eventu */
  }
  return <Text>Dokoncz rejestracje</Text>;
};
