'use client'
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { StepButton } from "@/components/stepbutton/StepButton";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      <StepButton steps={["elo","eki"]} activeStepIndex={2} onStepClicked={()=>{}}/>
      content
    </>
  );
}
