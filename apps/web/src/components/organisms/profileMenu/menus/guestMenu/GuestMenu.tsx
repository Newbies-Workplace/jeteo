"use client";

import Button from "@/components/atoms/button/Button";
import styles from "./GuestMenu.module.scss";
import { Text } from "@/components/atoms/text/Text";
import menuStyles from "../menus.module.scss";
import colors from "@/colors.module.scss";
import Link from "next/link";
import { Avatar } from "@/components/atoms/avatar/Avatar";

export default function GuestMenu() {
  return (
    <div className={styles.menu}>
      <div className={menuStyles.profile}>
        <Avatar size={64} src={undefined} />

        <Text variant="headS" bold={true} className={menuStyles.text}>
          Gall anonim
        </Text>
      </div>

      <Link href={"/auth/signin"}>
        <Button
          size="small"
          style={{
            borderRadius: "8px",
            backgroundColor: colors.white,
            color: colors.black,
            width: "100%",
          }}
        >
          <Text variant="bodyM">Zaloguj się</Text>
        </Button>
      </Link>
    </div>
  );
}
