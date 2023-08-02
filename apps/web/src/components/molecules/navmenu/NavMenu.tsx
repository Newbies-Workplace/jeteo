import React from "react";
import Link from "next/link";
import Image from "next/image";
import burgir from "@/assets/Burger.svg";

export const NavMenu: React.FC = () => {
  return (
    <div>
      <Link href={"/studio/events"}>studio</Link>
      <Link href={"/auth/signin"}>
        <Image alt="burgir" src={burgir} />
      </Link>
    </div>
  );
};
