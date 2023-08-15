'use client';

import { Control, RegisterOptions, useController } from "react-hook-form";
import React from "react";
import { MarkdownInput, MarkdownInputProps } from "@/components/atoms/markdownInput/MarkdownInput";

export type ControlledInputProps = {
  name: string;
  control: Control<any>;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
} & Omit<MarkdownInputProps, 'setValue' | 'value'>;

export const ControlledMarkdownInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  rules,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <MarkdownInput
      {...rest}
      value={field.value ?? ''}
      setValue={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  );
};
