"use client";
import { Logo } from "@/components/atoms/logo/Logo";
import styles from "./Dialog.module.scss";
import { Text } from "@/components/atoms/text/Text";
import React from "react";
import cs from "classnames";
import Image from "next/image";
import arrowBackIcon from "@/assets/arrow-back.svg";
import { useRouter } from "next/navigation";
import { cn } from "../../../../lib/utils";

interface DialogProps {
  title: string;
  arrowBack?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  arrowBack = false,
  children,
  style,
  className,
}) => {
  const router = useRouter();

  return (
    <div className={cn(styles.container, className)} style={style}>
      {arrowBack && (
        <div
          style={{
            width: "100%",
            alignItems: "start",
            paddingLeft: 16,
            marginBottom: -30,
          }}
        >
          <Image
            width={24}
            height={24}
            className={styles.arrowBack}
            src={arrowBackIcon}
            alt="Arrow back"
            onClick={() => router.back()}
            data-cy={"back-button"}
          />
        </div>
      )}
      <Logo />
      <Text variant="headM">{title}</Text>
      {children}
    </div>
  );
};
