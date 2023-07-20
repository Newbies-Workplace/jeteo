"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";
import Link from "next/link";

export const NavMenu: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <span>{user?.nick}</span>
      <Link href={"/auth/signin"}>ekran logowania</Link>
    </div>
  );
};
