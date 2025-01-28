"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import { Dialog } from "@/components/molecules/dialog/Dialog";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <GalaxyBackground>
      <div className="w-full h-full flex justify-center items-center">
        <Dialog title="Jeszcze chwila ⌛" className={"z-[1]"}></Dialog>
      </div>
    </GalaxyBackground>
  );
}
