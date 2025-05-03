import { Navbar } from "@/components/molecules/navbar/Navbar";
import React from "react";
import Image from "next/image";
import calendarIcon from "@/assets/calendar.svg";
import lectureIcon from "@/assets/lecture.svg";
import inviteIcon from "@/assets/invite.svg";
import { NavButton } from "@/components/molecules/navButton/NavButton";
import AuthRoot from "@/contexts/Auth.root";
import { StudioPageSkeleton } from "@/contexts/loaders/StudioPageSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthRoot loader={<StudioPageSkeleton />}>
      <div className={"flex flex-col"}>
        <Navbar />
        <div className={"flex flex-row justify-center gap-4 p-4"}>
          <div className={"flex flex-col items-center gap-2 max-w-[300px]"}>
            <span className={"font-bold text-2xl"}>Studio</span>
            <NavButton href={"/studio/events"}>
              <Image src={calendarIcon} alt={"Wydarzenia"} />
              Wydarzenia
            </NavButton>
            <NavButton href={"/studio/my-lectures"}>
              <Image src={lectureIcon} alt={"Prelekcje"} />
              Moje prelekcje
            </NavButton>
            <NavButton href={"/studio/invites"}>
              <Image src={inviteIcon} alt={"Zaproszenia"} />
              Zaproszenia
            </NavButton>
          </div>
          <div className={"flex-1 max-w-screen-lg"}>{children}</div>
        </div>
      </div>
    </AuthRoot>
  );
}
