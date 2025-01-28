"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { Text } from "@/components/atoms/text/Text";
import { TextLabel } from "@/components/atoms/textLabel/TextLabel";

export type InputProps = {
  label?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  multiline?: boolean;
  value: string;
  setValue: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const inputStyles = cva("w-full border rounded-lg p-2 bg-background", {
  variants: {
    multiline: {
      true: "min-h-[60px] resize-vertical",
      false: "min-h-[30px]",
    },
    error: {
      true: "border-red-500",
      false: "border-stroke",
    },
  },
  defaultVariants: {
    multiline: false,
    error: false,
  },
});

export const Input: React.FC<InputProps> = ({
  label,
  error,
  type,
  multiline = false,
  className,
  style,
  placeholder,
  required = false,
  value,
  setValue,
  onBlur,
}) => {
  return (
    <div className="flex flex-col" style={style}>
      {label && <TextLabel label={label} required={required} />}

      <div className="my-1">
        {multiline ? (
          <textarea
            className={inputStyles({ multiline, error: !!error, className })}
            placeholder={placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={onBlur}
            required={required}
          />
        ) : (
          <input
            className={inputStyles({ multiline, error: !!error, className })}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={onBlur}
            required={required}
          />
        )}
      </div>

      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </div>
  );
};
