import styles from "./page.module.scss";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/molecules/dialog/Dialog";
import { Text } from "@/components/atoms/text/Text";
import Google from "@/assets/google.svg";
import { SignInButton } from "@/app/auth/signin/components/SignInButton";

const baseUrl: string = process.env["NEXT_PUBLIC_BACKEND_URL"];

export default function Page() {
  return (
    <GalaxyBackground>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Dialog title="Zaczynamy przygodę 🚀" arrowBack style={{ zIndex: 1 }}>
          <Text variant={"bodyM"}>Kontynuuj przez:</Text>
          <div className={styles.buttons}>
            <Link href={`${baseUrl}/auth/google/redirect`}>
              <SignInButton icon={Google}>Google</SignInButton>
            </Link>
          </div>
          <div style={{ textAlign: "center", paddingTop: 12 }}>
            <Text variant={"bodyM"}>
              Korzystając z serwiusu akceptujesz
              <br />
            </Text>
            <Link href={"/privacy-policy"} className={styles.link}>
              politykę prywatnosci
            </Link>
          </div>
        </Dialog>
      </div>
    </GalaxyBackground>
  );
}
