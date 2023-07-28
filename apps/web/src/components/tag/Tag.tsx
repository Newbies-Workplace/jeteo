import React from "react";
import cs from "classnames";
import styles from "./Tag.module.scss";
import { Text } from "@/components/text/Text";

interface TagProps {
  className?: string;
  text: string;
}
export const Tag: React.FC<TagProps> = ({ className, text }) => {
  return <Text className={cs(styles.tag, className)}>{text}</Text>;
};
