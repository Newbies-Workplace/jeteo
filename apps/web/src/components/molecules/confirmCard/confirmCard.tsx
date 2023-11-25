import React from "react";
import styles from "./confirmCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";

export const ConfirmCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Text variant="headS">
          ucieczka w polske{" "}
          <Text variant="headS" bold>
            dobrze kurtka znam
          </Text>
        </Text>

        <span className={styles.description}>
          <Text variant="bodyM">Krew</Text>
        </span>
        <div className={styles.buttons}>
          <Button className={styles.cancel}>szykuje mi się krawa jesień</Button>
          <Button className={styles.delete}>
            szykuje mi się krawy wrzesień
          </Button>
        </div>
      </div>
    </div>
  );
};
