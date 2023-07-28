'use client';
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { StepButton } from "@/components/stepbutton/StepButton";
export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      <StepButton steps={['elo']} activeStepIndex={0} onStepClicked={()=>{}} ></StepButton>
      content
    </>
  );
}
