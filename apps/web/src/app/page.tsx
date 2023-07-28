import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import GalaxyBackground from "@/components/galaxyBackground/GalaxyBackground";

export default function Page() {
  return (
    <>
    <GalaxyBackground>
      <Navbar>
        <NavMenu />
      </Navbar>
      content
      </GalaxyBackground>
    </>
  );
}
