import React from "react";
import styles from "./ConfirmDialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onDismiss: () => void;
  onConfirm: () => void;
  dismissText?: string;
  confirmText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onDismiss,
  onConfirm,
  dismissText = "Anuluj",
  confirmText = "Potwierdź",
}) => {
  return (
    <div className={styles.root} onClick={onDismiss}>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Text variant="headS">{title}</Text>

        <span className={styles.description}>
          <Text variant="bodyM">{description}</Text>
        </span>

        <div className={styles.buttons}>
          <Button onClick={onDismiss} className={styles.dismiss}>
            <Text variant="bodyL" className={styles.dismisstext}>
              {dismissText}
            </Text>
          </Button>

          <Button onClick={onConfirm} className={styles.confirm}>
            <Text variant="bodyL" className={styles.confirmtext}>
              {confirmText}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
