"use client";

import React from "react";
import { useAuth } from "@/contexts/Auth.hook";
import Link from "next/link";
import Image from "next/image";
import burgir from "@/assets/Burger.svg";

export const NavMenu: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <span>{user?.nick}</span>

      <Link href={"/studio/events"}>studio</Link>
      <Link href={"/auth/signin"}>
        <Image alt="burgir" src={burgir} />
      </Link>
    </div>
  );
};
