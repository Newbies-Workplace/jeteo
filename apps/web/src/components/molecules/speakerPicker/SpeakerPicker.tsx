import React from "react";
import styles from "./SpeakerPicker.module.scss";
import GreyCircle from "@/assets/images/speaker-picker-circle-grey.svg";
import Add from "@/assets/add.svg";
import Image from "next/image";

export const SpeakerPicker: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <Image src={GreyCircle} alt={GreyCircle} width={32} height={32} />

        <input className={styles.input} type="email" placeholder="Email" />
        <input
          className={styles.input}
          type="text"
          placeholder="Nazwa (widoczna publicznie)"
        />

        <Image
          className={styles.add}
          src={Add}
          alt={"add"}
          width={20}
          height={20}
        />
      </div>

      {/*todo lista zaproszen*/}
      {/*todo lista userów*/}
    </div>
  );
};
