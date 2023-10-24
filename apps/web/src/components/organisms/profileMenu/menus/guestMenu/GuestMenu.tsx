"use client";

import Button from "@/components/atoms/button/Button";
import styles from "./GuestMenu.module.scss";
import { Text } from "@/components/atoms/text/Text";
import menuStyles from "../menus.module.scss";
import Link from "next/link";
import { Avatar } from "@/components/atoms/avatar/Avatar";

export default function GuestMenu() {
  return (
    <div className={styles.menu}>
      <div className={menuStyles.profile}>
        <Avatar size={64} src={undefined} />

        <Text variant="headS" bold={true} className={menuStyles.text}>
          Gość
        </Text>
      </div>

      <div className={menuStyles.buttonContainer}>
        <Link href={"/auth/signin"}>
          <Button size="small" className={menuStyles.button}>
            <Text variant="bodyM">Zaloguj się</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
}
