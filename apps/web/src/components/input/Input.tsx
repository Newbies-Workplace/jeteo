"use client";
import styles from "./Input.module.scss";
import React from "react";
import cs from "classnames";
import { Text } from "@/components/text/Text";

interface InputProps {
  name?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  multiline?: boolean;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  label,
  multiline = false,
  type,
  className,
  style,
  placeholder,
  required = false,
  value,
  setValue,
}) => {
  return (
    <div className={styles.input} style={style}>
      <Text className={cs(required && styles.required)} variant={"headS"}>
        {label}
      </Text>

      <div className={styles.inputWrapper}>
        {multiline ? (
          <textarea
            className={cs(styles.multiline, className)}
            placeholder={placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required={required}
          />
        ) : (
          <input
            className={cs(styles.oneline, className)}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required={required}
          />
        )}
      </div>
    </div>
  );
};
