import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { GetUser } from "@/components/home/GetUser";
import { IsFullyRegistered } from "@/components/home/IsFullyRegistered";
import  styles  from "@/app/page.module.scss";

export default function Page() { 
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>

      <div className={styles.main}>
        <p>Witaj, <GetUser/> 👋</p>

        <IsFullyRegistered/>
        
        <div>
            <p>Wydarzenia dla ciebie</p>
            {/* TODO: dodac tu komponent z karteckzami eventu */}
            <div className={styles.example}></div>

        </div>
        <div>
            <p>Wszystkie wydarzenia</p>
            {/* TODO: dodac tu komponent z karteckzami eventu */}
            <div className={styles.example}></div>
        </div>

      </div>
    </>
  );
}
