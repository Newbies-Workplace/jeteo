import styles from "./page.module.scss";
import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/molecules/dialog/Dialog";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import Google from "@/assets/google.svg";

export default async function Page() {
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
            <Link href={"http://127.0.0.1:3001/api/auth/google/redirect"}>
              <Button
                signIn
                outlined
                icon={Google}
                style={{ paddingRight: 84 }}
              >
                Google
              </Button>
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
