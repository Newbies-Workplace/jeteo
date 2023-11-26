import React from "react";
import styles from "./ConfirmCard.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";

interface ConfirmCardProps {
  title: string;
  description: string;
  onDimiss: () => void;
  onDeleteAction: () => void;
  dismisstext?: string;
  deletetext?: string;
}

export const ConfirmCard: React.FC<ConfirmCardProps> = ({
  title,
  description,
  onDimiss,
  onDeleteAction,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Text variant="headS">
          Czy na pewno chcesz usunąć{" "}
          <Text variant="headS" bold>
            {title}
          </Text>
        </Text>

        <span className={styles.description}>
          <Text variant="bodyM">{description}</Text>
        </span>
        <div className={styles.buttons}>
          <Button onClick={onDimiss} className={styles.cancel}>
            <Text variant="bodyL" className={styles.deletetext}>
              Anuluj
            </Text>
          </Button>

          <Button onClick={onDeleteAction} className={styles.delete}>
            <Text variant="bodyL" className={styles.deletetext}>
              Usuń
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
