"use client";

import Image from "next/image";
import burger from "@/assets/burger.svg";
import burgerWhite from "@/assets/burger-white.svg";
import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import { Text } from "@/components/atoms/text/Text";
import Link from "next/link";
import Button from "@/components/atoms/button/Button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";

export interface ProfileMenuProps {
  invertColors?: boolean;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ invertColors }) => {
  const { data } = useSession();
  const user = data?.user;

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={"relative"} ref={dropdownRef}>
      <Image
        data-cy={"open-menu"}
        className={"cursor-pointer"}
        alt="Open menu"
        src={invertColors ? burgerWhite : burger}
        onClick={() => setShowMenu(!showMenu)}
      />
      <div className={"relative"}>
        {showMenu && (
          <div
            className={
              "absolute top-[120%] right-0 flex flex-col justify-center items-center gap-3 w-56 p-2 bg-primary shadow-lg z-10 rounded-2xl rounded-tr-none"
            }
          >
            <div
              className={
                "flex flex-row justify-start items-center gap-2 self-stretch"
              }
            >
              <Avatar size={64} src={user?.avatar ?? undefined} />

              <Text variant="headS" bold={true} className={"text-white"}>
                {user ? user.name : "Gość"}
              </Text>
            </div>

            {user ? <UserMenu /> : <GuestMenu />}
          </div>
        )}
      </div>
    </div>
  );
};

function UserMenu() {
  return (
    <div className={"flex flex-col self-stretch gap-2"}>
      <Link href={"/studio/events"}>
        <MenuButton>
          <Text variant="bodyM">Jeteo studio</Text>
        </MenuButton>
      </Link>

      <Link href={"/settings"}>
        <MenuButton>
          <Text variant="bodyM">Ustawienia</Text>
        </MenuButton>
      </Link>

      <MenuButton
        onClick={signOut}
        className={
          "bg-live text-white hover:bg-live-hover active:bg-live-active"
        }
      >
        <Text variant="bodyM">Wyloguj</Text>
      </MenuButton>
    </div>
  );
}

function GuestMenu() {
  return (
    <div className={"flex flex-col self-stretch gap-2"}>
      <Link href={"/auth/signin"} data-cy={"signin-link"}>
        <MenuButton>
          <Text variant="bodyM">Zaloguj się</Text>
        </MenuButton>
      </Link>
    </div>
  );
}

function MenuButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      size="small"
      className={cn(
        "border-none rounded-lg bg-white text-black w-full",
        className
      )}
      onClick={onClick}
    >
      <Text variant="bodyM">{children}</Text>
    </Button>
  );
}
