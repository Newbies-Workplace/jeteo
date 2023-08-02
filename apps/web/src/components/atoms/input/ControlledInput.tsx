"use client";

import { Input, InputProps } from "@/components/atoms/input/Input";
import { Control, RegisterOptions, useController } from "react-hook-form";
import React from "react";

export type ControlledInputProps = {
  name: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
} & Omit<InputProps, "setValue" | "value">;

export const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  rules,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <Input
      {...rest}
      value={field.value}
      setValue={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  );
};
