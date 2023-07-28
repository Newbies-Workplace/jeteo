import { Navbar } from "@/components/navbar/Navbar";
import { NavMenu } from "@/components/navmenu/NavMenu";
import { GetUser } from "@/components/home/GetUser";
import { IsFullyRegistered } from "@/components/home/IsFullyRegistered";
import { Text } from "@/components/text/Text";
import styles from "@/app/page.module.scss";

export default function Page() {
  return (
    <>
      <Navbar>
        <NavMenu />
      </Navbar>
      <div className={styles.main}>
        <Text variant="headM">
          Witaj, <GetUser /> 👋
        </Text>

        <div>
          <IsFullyRegistered />
        </div>

        <div>
          <Text>Wydarzenia dla ciebie</Text>
          {/* TODO: dodac tu komponent z karteckzami eventu */}
          <div className={styles.example}></div>
        </div>
        <div>
          <Text>Wszystkie wydarzenia</Text>
          {/* TODO: dodac tu komponent z karteckzami eventu */}
          <div className={styles.example}></div>
        </div>
      </div>
    </>
  );
}
