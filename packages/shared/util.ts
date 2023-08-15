export const notBlank = (value: string | undefined): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value.trim() === '') {
    return undefined;
  }

  return value;
};

export const notBlankOrNull = (value: string | undefined): string | null => {
  const result = notBlank(value);
  return result === undefined ? null : result;
};

export const trimIfExists = (
  value: string | undefined | null,
): string | undefined | null => {
  if (value === undefined || value === null) {
    return value;
  }

  return value.trim();
};
