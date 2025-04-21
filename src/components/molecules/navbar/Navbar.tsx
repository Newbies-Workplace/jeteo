import React from "react";
import { Logo } from "@/components/atoms/logo/Logo";
import Link from "next/link";
import { ProfileMenu } from "@/components/organisms/profileMenu/ProfileMenu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  invertColor?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ invertColor }) => {
  return (
    <div
      className={cn(
        "flex px-4 py-2 sm:py-3 sm:px-24 justify-between items-center self-stretch bg-surface no-underline text-black",
        invertColor && "bg-transparent text-surface"
      )}
    >
      <Link href={"/"}>
        <Logo invertColor={invertColor} />
      </Link>
      <div>
        <ProfileMenu invertColors={invertColor} />
      </div>
    </div>
  );
};
