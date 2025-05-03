import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import Image from "next/image";
import person from "@/assets/person.svg";
import { NavButton } from "@/components/molecules/navButton/NavButton";
import AuthRoot from "@/contexts/Auth.root";
import { SettingsPageSkeleton } from "@/contexts/loaders/settingsPageSkeleton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRoot loader={<SettingsPageSkeleton />}>
      <div className={"flex flex-col"}>
        <Navbar />
        <div className={"flex flex-row justify-center gap-4 p-4"}>
          <div className={"flex flex-col items-center gap-2 max-w-[300px]"}>
            <span className={"font-bold text-2xl"}>Ustawienia</span>
            <NavButton href={"/settings"}>
              <Image src={person} alt={""} />
              Profil
            </NavButton>
          </div>
          <div className={"flex-1 max-w-screen-lg"}>{children}</div>
        </div>
      </div>
    </AuthRoot>
  );
}
