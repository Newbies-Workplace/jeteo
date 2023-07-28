import { Text } from "@/components/text/Text";
import Button from "@/components/button/Button";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant={"headM"} bold>
          Wydarzenia
        </Text>

        <Button primary>Dodaj</Button>
      </div>

      <div style={{ width: "100%", height: 60, backgroundColor: "pink" }}>
        event
      </div>
      <div style={{ width: "100%", height: 60, backgroundColor: "pink" }}>
        event
      </div>
    </div>
  );
}
