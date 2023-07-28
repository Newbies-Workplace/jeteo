import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import Button from "@/components/Button/Button";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
        <Button></Button>
      </Navbar>
      content
    </>
  );
}
