import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notBlank = (value: string | undefined): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value.trim() === "") {
    return undefined;
  }

  return value;
};
