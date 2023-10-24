"use client";

import Button from "@/components/atoms/button/Button";
import styles from "./UserMenu.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth.hook";
import menuStyles from "../menus.module.scss";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import cs from "classnames";

export default function UserMenu() {
  const { user } = useAuth();

  return (
    <div className={styles.menu}>
      <div className={menuStyles.profile}>
        <Avatar size={64} src={user.avatar} />

        <Text variant="headS" bold={true} className={menuStyles.text}>
          {user?.name}
        </Text>
      </div>
      <div className={menuStyles.buttonContainer}>
        <Link href={"/studio/events"}>
          <Button size="small" className={menuStyles.button}>
            <Text variant="bodyM">Jeteo studio</Text>
          </Button>
        </Link>

        <Link href={"/settings"}>
          <Button size="small" className={menuStyles.button}>
            <Text variant="bodyM">Ustawienia</Text>
          </Button>
        </Link>

        <Link href={"./"}>
          <Button
            size="small"
            className={cs(menuStyles.button, menuStyles.dangerousButton)}
          >
            <Text variant="bodyM">Wyloguj</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
}
