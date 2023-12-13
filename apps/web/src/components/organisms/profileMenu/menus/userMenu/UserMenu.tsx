"use client";

import Button from "@/components/atoms/button/Button";
import styles from "./UserMenu.module.scss";
import { Text } from "@/components/atoms/text/Text";
import Link from "next/link";
import { useAuth } from "@/contexts/Auth.hook";
import menuStyles from "../menus.module.scss";
import { Avatar } from "@/components/atoms/avatar/Avatar";
import cs from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();
  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

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

        <Button
          size="small"
          className={cs(menuStyles.button, menuStyles.dangerousButton)}
          onClick={logout}
        >
          <Text variant="bodyM">Wyloguj</Text>
        </Button>
      </div>
    </div>
  );
}
