import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { Text } from "@/components/text/Text";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      content
      <Text variant="headM">ESSA</Text>
    </>
  );
}
