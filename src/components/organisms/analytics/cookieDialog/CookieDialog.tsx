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
    <div
      className={
        "z-10 fixed bottom-0 right-0 flex p-4 flex-col items-center text-white"
      }
    >
      <div
        className={
          "relative overflow-hidden flex flex-col sm:flex-row p-4 items-center gap-2 self-stretch max-w-[600px] rounded-2xl bg-space"
        }
      >
        <div className={"absolute opacity-20 -top-[100px] w-screen"}>
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
          <Image alt="Cookie" src={CookieImage} className={styles.cookie} />
        </div>

        <div className={"z-[1] flex flex-col items-start gap-2 flex-1"}>
          <Text variant={"headM"} bold>
            🍪Ciasteczka🍪
          </Text>
          <Text variant={"bodyS"}>
            Strona jeteo korzysta z plików cookies, klikając „Zezwól”, zgadzasz
            się na przechowywanie plików cookie na swoim urządzeniu w celu
            usprawnienia nawigacji w witrynie i analizy korzystania z witryny.
          </Text>
        </div>

        <div className={"z-[1] flex flex-row sm:flex-col items-start gap-4"}>
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
