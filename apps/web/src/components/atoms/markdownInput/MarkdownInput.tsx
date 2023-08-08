"use client";

import { Text } from "@/components/atoms/text/Text";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { ITextAreaProps } from "@uiw/react-md-editor/lib/components/TextArea";
import { Label } from "@/components/atoms/label/Label";
import styles from "@/components/atoms/input/Input.module.scss";

export interface MarkdownInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  onBlur?: () => void;
  height?: number;
  textareaProps?: ITextAreaProps;
}

export const MarkdownInput: React.FC<MarkdownInputProps> = ({
  label,
  error,
  required = false,
  placeholder,
  value,
  setValue,
  onBlur,
  height,
  textareaProps,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Label label={label} required={required} />

      <div data-color-mode="light">
        <MDEditor
          textareaProps={textareaProps}
          height={height}
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={setValue}
        />
      </div>

      {error && (
        <Text className={styles.error} variant={"bodyS"}>
          {error}
        </Text>
      )}
    </div>
  );
};
