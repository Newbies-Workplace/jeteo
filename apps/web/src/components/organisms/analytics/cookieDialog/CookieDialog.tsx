"use client";

import React, { useEffect, useState } from "react";
import { Text } from "@/components/atoms/text/Text";
import Button from "@/components/atoms/button/Button";
import styles from "./CookieDialog.module.scss";
import Image from "next/image";
import CookieImage from "@/assets/images/cookie.svg";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";

export const CookieDialog: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  if (cookieConsent != null) return null;

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
            🍪Ciasteczka🍪
          </Text>
          <Text variant={"bodyS"}>
            Strona jeteo korzysta z plików cookies, klikając „Zezwól”, zgadzasz
            się na przechowywanie plików cookie na swoim urządzeniu w celu
            usprawnienia nawigacji w witrynie i analizy korzystania z witryny.
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
            onClick={() => setCookieConsent(false)}
          >
            Odrzuć
          </Button>

          <Button primary size={"small"} onClick={() => setCookieConsent(true)}>
            Zezwól
          </Button>
        </div>
      </div>
    </div>
  );
};
