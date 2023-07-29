import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { GetUser } from "@/components/home/GetUser";
import { IsFullyRegistered } from "@/components/home/IsFullyRegistered";
import { Text } from "@/components/text/Text"
import styles from "@/app/page.module.scss"

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu/>
      </Navbar>

      <div className={styles.main}>

        <div className={styles.title}>
          <Text variant="headL">Witaj,</Text>
          <Text variant="headLbold"> <GetUser/> 👋</Text>
        </div>

        <div>
          <IsFullyRegistered/>
        </div>

        <div className={styles.section}>
          <Text variant="headMbold" className={styles.sectionTitle} >Wydarzenia dla ciebie</Text>  
          <div className={styles.example}></div>
        </div>

        <div className={styles.section}>
          <Text variant="headMbold" className={styles.sectionTitle} >Wszystkie wydarzenia</Text>
          <div className={styles.example}></div>
        </div>
      
      </div>
    </>
  );
}
