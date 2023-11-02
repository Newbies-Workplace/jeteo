"use client";

import React from "react";
import styles from "./InviteCard.module.scss";
import Button from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";
import { SpeakerCard } from "@/components/molecules/speakerCard/SpeakerCard";
import { Label } from "@/components/atoms/label/Label";
import { formatFromToDates } from "@/common/utils";

export interface InviteCardProps {}

export const InviteCard: React.FC<InviteCardProps> = ({}) => {
  return (
    <div className={styles.card}>
      <Text>
        Witaj <Text bold>Nazwa</Text> Zostań prelegentem w wydarzeniu{" "}
        <Text bold>Nazwa wydarzenia</Text>!
      </Text>

      <div className={styles.mid}>
        <div className={styles.texts}>
          <Text variant={"headS"} bold>
            Nazwa prelekcji
          </Text>

          <Label text={formatFromToDates("", "")} />
        </div>

        <SpeakerCard name={"Janousz"} />
      </div>

      <div className={styles.buttons}>
        <Button primary className={styles.button}>
          Akceptuj
        </Button>
        <Button className={styles.button}>Odrzuć</Button>
      </div>
    </div>
  );
};
