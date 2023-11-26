import React from "react";
import styles from "./ConfirmCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";

interface ConfirmCardProps {
  title: string;
  description: string;
  onDimiss: () => void;
  onConfirm: () => void;
  titletext?: string;
  dismisstext?: string;
  confirmtext?: string;
}

export const ConfirmCard: React.FC<ConfirmCardProps> = ({
  title,
  description,
  onDimiss,
  onConfirm,
  titletext,
  dismisstext,
  confirmtext,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Text variant="headS">
          {titletext ? titletext : "Czy napewno chcesz usunąć"}{" "}
          <Text variant="headS" bold>
            {title}
          </Text>
        </Text>

        <span className={styles.description}>
          <Text variant="bodyM">{description}</Text>
        </span>
        <div className={styles.buttons}>
          <Button onClick={onDimiss} className={styles.dismiss}>
            <Text variant="bodyL" className={styles.dismisstext}>
              {dismisstext ? dismisstext : "Anuluj"}
            </Text>
          </Button>

          <Button onClick={onConfirm} className={styles.confirm}>
            <Text variant="bodyL" className={styles.confirmtext}>
              {confirmtext ? confirmtext : "Usuń"}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
