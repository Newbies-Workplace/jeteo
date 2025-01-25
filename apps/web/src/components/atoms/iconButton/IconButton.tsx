import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: string;
  alt?: string;
  primary?: boolean;
  onClick?: () => void;
  size?: "medium" | "small";
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  onClick,
  primary = false,
  size = "medium",
}) => {
  const imageSize = size === "medium" ? 24 : 18;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2.5 flex-shrink-0 rounded-lg border cursor-pointer select-none",
        size === "medium" && "w-10 h-10 p-2",
        size === "small" && "w-8 h-8 p-1.5",
        primary
          ? "bg-primary border-none hover:bg-primaryHover active:bg-primaryActive"
          : "bg-surface border-stroke hover:bg-lightHover active:bg-lightActive"
      )}
      onClick={onClick}
    >
      <Image
        src={icon}
        alt={alt ?? "iconButton"}
        width={imageSize}
        height={imageSize}
      />
    </div>
  );
};
