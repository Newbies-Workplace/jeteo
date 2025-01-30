import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/molecules/dialog/Dialog";
import { Text } from "@/components/atoms/text/Text";
import Google from "@/assets/google.svg";
import { SignInButton } from "@/app/auth/signin/components/SignInButton";

const baseUrl: string = process.env["NEXT_PUBLIC_BACKEND_URL"]!;

export default function Page() {
  return (
    <GalaxyBackground>
      <div className="w-full h-full flex justify-center items-center fixed z-[1]">
        <Dialog title="Zaczynamy przygodę 🚀" arrowBack>
          <Text variant={"bodyM"}>Kontynuuj przez:</Text>
          <div className="w-full flex flex-col gap-2.5 items-center justify-center pt-3.5 px-2.5 md:px-0">
            <Link
              href={`${baseUrl}/auth/google/redirect`}
              data-cy={"google-button"}
            >
              <SignInButton icon={Google}>Google</SignInButton>
            </Link>
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
