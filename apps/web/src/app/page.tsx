import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { Logo } from "@/components/logo/Logo";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      content
    </>
  );
}
