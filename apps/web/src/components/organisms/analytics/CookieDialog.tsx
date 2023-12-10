"use client";

import React from "react";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import styles from "./CookieDialog.module.scss";
import Image from "next/image";
import CookieImage from "@/assets/images/cookie.svg";

interface CookieDialogProps {}

export const CookieDialog: React.FC = () => {
  const onCookiesAccepted = () => {};

  const onCookiesRejected = () => {};

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <div className={styles.cookies}>
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
        </div>

        <div className={styles.texts}>
          <Text variant={"headM"} bold>
            🍪Kosmiczne ciasteczka🍪
          </Text>
          <Text variant={"bodyS"}>
            Witaj w kosmicznej sferze informacji! Poprzez kliknięcie "Zgadzam
            się" wchodzisz w orbitę naszej innowacyjnej analizy danych. Nasze
            niezwykłe ciasteczka pełnią rolę narzędzi, zbierając cenne
            informacje, które pomagają nam doskonalić nasze usługi.
          </Text>
        </div>

        <div className={styles.buttons}>
          <Button
            size={"small"}
            style={{
              alignSelf: "stretch",
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={onCookiesRejected}
          >
            Odrzuć
          </Button>

          <Button primary size={"small"} onClick={onCookiesAccepted}>
            Zgadzam się
          </Button>
        </div>
      </div>
    </div>
  );
};
