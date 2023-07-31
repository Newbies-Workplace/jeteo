"use client";

import styles from "./StepNavigation.module.scss";
import cs from "classnames";
import React from "react";
import { Text } from "@/components/text/Text";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface StepButtonProps {
  title: string;
  active: boolean;
  disabled?: boolean;
}

export const StepButton: React.FC<StepButtonProps> = ({
  title,
  active,
  disabled = false,
}) => (
  <div className={cs(styles.step, { [styles.disabled]: disabled })}>
    <span className={cs(styles.circle, { [styles.selected]: active })} />

    <Text
      className={cs(styles.text, {
        [styles.textActive]: active,
      })}
      variant={"headM"}
    >
      {title}
    </Text>
  </div>
);

interface StepsContainerProps {
  links: {
    href: string;
    name: string;
  }[];
}

export const StepNavigation: React.FC<StepsContainerProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <div className={styles.stepsContainer}>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link href={link.href} key={link.name}>
            <StepButton key={link.name} active={isActive} title={link.name} />
          </Link>
        );
      })}
    </div>
  );
};
