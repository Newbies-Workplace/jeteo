import Image from "next/image";
import logo from "@/assets/planet.svg";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  invertColor?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ invertColor }) => {
  return (
    <div className={"inline-flex justify-center items-center gap-3"}>
      <Image alt="logo" src={logo} width={41} height={41} />
      <span
        className={cn(
          "font-oswald text-xl text-black",
          invertColor && "text-surface"
        )}
      >
        jeteo
      </span>
    </div>
  );
};
