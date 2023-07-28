import GalaxyBackground from "@/components/galaxyBackground/GalaxyBackground";
import Link from "next/link";
import { Dialog } from "@/components/dialog/Dialog";

export default async function Page() {
  return (
    <GalaxyBackground>
      <div style={{width: "100%", height: "100%" , display: "flex", justifyContent: "center", alignItems:"center"}}>
      <Dialog title="NO siema stary kliknijs ">
        <Link href={"http://127.0.0.1:3001/api/auth/google/redirect"}>
          zaloguj z google
        </Link>
      </Dialog>
      </div>
    </GalaxyBackground>
  );
}
