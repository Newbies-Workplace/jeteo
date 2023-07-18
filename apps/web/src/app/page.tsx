import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";

export default function Page() {
  return (
    <>
      <Navbar>
        <Link href={"/signin"}>ekran logowania</Link>
      </Navbar>
      content
    </>
  );
}
