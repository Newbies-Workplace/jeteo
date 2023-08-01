import { GalaxyBackground } from "@/components/molecules/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/molecules/dialog/Dialog";

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
        <Dialog title="Zaczynamy przygodę 🚀" style={{ zIndex: 1 }}>
          <Link href={"http://127.0.0.1:3001/api/auth/google/redirect"}>
            zaloguj z google
          </Link>
        </Dialog>
      </div>
    </GalaxyBackground>
  );
}
