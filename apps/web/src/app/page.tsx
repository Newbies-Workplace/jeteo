import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      homupage
    </>
  );
}
