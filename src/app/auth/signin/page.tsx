import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/molecules/dialog/Dialog";
import { Text } from "@/components/atoms/text/Text";
import Google from "@/assets/google.svg";
import cs from "classnames";
import { signIn } from "@/lib/auth";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <GalaxyBackground>
      <div className="w-full h-full flex justify-center items-center fixed z-[1]">
        <Dialog title="Zaczynamy przygodę 🚀" arrowBack>
          <Text variant={"bodyM"}>Kontynuuj przez:</Text>
          <div className="w-full flex flex-col gap-2.5 items-center justify-center pt-3.5 px-2.5 md:px-0">
            <form
              action={async () => {
                "use server";

                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className={cs(
                  "flex min-w-[100px] justify-center items-center gap-16 p-[8px_84px_8px_12px] bg-white text-black rounded-[16px] border border-stroke text-center cursor-pointer hover:bg-light-hover active:bg-light-active"
                )}
              >
                <Image alt={"icon"} src={Google} />
                Google
              </button>
            </form>
          </div>
          <div className="text-center pt-3">
            <Text variant={"bodyM"}>
              Korzystając z serwiusu akceptujesz
              <br />
            </Text>
            <Link href={"/privacy-policy"} className="underline text-black">
              politykę prywatności
            </Link>
          </div>
        </Dialog>
      </div>
    </GalaxyBackground>
  );
}
