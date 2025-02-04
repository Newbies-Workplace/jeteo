import React from "react";
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
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50"
      onClick={onDismiss}
    >
      <div
        className="flex flex-col items-center gap-6 p-6 min-w-full sm:min-w-[420px] bg-white rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Text variant="headS">{title}</Text>

        <span className="text-center">
          <Text variant="bodyM">{description}</Text>
        </span>

        <div className="flex flex-wrap justify-center gap-4 w-full">
          <Button onClick={onDismiss} className="flex-1">
            <Text variant="bodyL" className="text-center text-black">
              {dismissText}
            </Text>
          </Button>

          <Button
            onClick={onConfirm}
            className="flex-1 bg-live hover:bg-live-hover active:bg-live-active"
          >
            <Text variant="bodyL" className="text-center text-white">
              {confirmText}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
