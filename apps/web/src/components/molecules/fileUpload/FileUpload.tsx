"use client";

import React, { useRef, useState } from "react";
import styles from "./FileUpload.module.scss";
import Button from "@/components/atoms/button/Button";
import cs from "classnames";
import { ALLOWED_IMAGE_EXTENSIONS } from "@/common/utils/constants";
import { Text } from "@/components/atoms/text/Text";

interface FileUploadProps {
  accept?: string;
  onChange: (files: FileList) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = ALLOWED_IMAGE_EXTENSIONS.join(", "),
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDraggingFile, setDraggingFile] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDraggingFile(true);
    } else if (e.type === "dragleave") {
      setDraggingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files);
    }
  };

  return (
    <div
      className={cs(styles.container, { [styles.hovering]: isDraggingFile })}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Text variant="bodyL">Przeciągnij plik tutaj lub</Text>

      <input
        ref={inputRef}
        type={"file"}
        className={styles.input}
        accept={accept}
        onChange={handleChange}
      />

      <Button
        className={styles.button}
        primary
        size={"small"}
        type={"button"}
        onClick={() => inputRef?.current?.click()}
      >
        Wybierz
      </Button>
    </div>
  );
};
