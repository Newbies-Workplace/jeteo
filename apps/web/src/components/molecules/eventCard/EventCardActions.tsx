'use client';

import React from "react";
import styles from "./EventCardActions.module.scss";
import { Text } from "@/components/atoms/text/Text";
import cs from "classnames";

export const EventCardActionsFuture: React.FC = () => {
  return (
    <div className={styles.actions}>
      <Text className={styles.action} bold>
        Dodaj przypomnienie
      </Text>

      <Text className={cs(styles.action, styles.stretched)} bold>
        Rozpoczęcie za 2 dni
      </Text>
    </div>
  );
};
export const EventCardActionsLive: React.FC = () => {
  return (
    <div className={styles.actions}>
      <Text className={cs(styles.action, styles.live)} bold>
        Kliknij aby ocenić
      </Text>

      <Text className={cs(styles.action, styles.live, styles.stretched)} bold>
        Na żywo, pozostały 4 godziny
      </Text>
    </div>
  );
};

export const EventCardActionsFresh: React.FC = () => {
  return (
    <div className={styles.actions}>
      <Text className={cs(styles.action, styles.live)} bold>
        Kliknij aby ocenić
      </Text>

      <Text className={cs(styles.action, styles.rate, styles.stretched)} bold>
        <span className={styles.rateAverage}>Średnia ocena: 4.5</span>
        <div className={styles.stars}>* * * * *</div>
      </Text>
    </div>
  );
};

export const EventCardActionsArchive: React.FC = () => {
  return (
    <div className={styles.actions}>
      <Text className={cs(styles.action, styles.rate, styles.stretched)} bold>
        <span className={styles.rateAverage}>Średnia ocena: 4.5</span>
        <div className={styles.stars}>* * * * *</div>
      </Text>
    </div>
  );
};
