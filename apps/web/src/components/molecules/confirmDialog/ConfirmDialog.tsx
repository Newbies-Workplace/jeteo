import React from "react";
import styles from "./ConfirmDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onDimiss: () => void;
  onConfirm: () => void;
  dismisstext?: string;
  confirmtext?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onDimiss,
  onConfirm,
  dismisstext = "Anuluj",
  confirmtext = "Potwierdź",
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Text variant="headS">{title}</Text>

        <span className={styles.description}>
          <Text variant="bodyM">{description}</Text>
        </span>
        <div className={styles.buttons}>
          <Button onClick={onDimiss} className={styles.dismiss}>
            <Text variant="bodyL" className={styles.dismisstext}>
              {dismisstext}
            </Text>
          </Button>

          <Button onClick={onConfirm} className={styles.confirm}>
            <Text variant="bodyL" className={styles.confirmtext}>
              {confirmtext}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
