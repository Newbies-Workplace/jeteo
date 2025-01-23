"use client";

import React, { useState } from "react";
import Image from "next/image";
import defaultAvatar from "@/assets/images/default-profile-pic.svg";
import { cn } from "@/lib/utils";

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  src: string | undefined;
  size: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size,
  className,
  style,
}) => {
  const [image, setImage] = useState<string>(src ?? defaultAvatar);

  return (
    <Image
      style={style}
      className={cn(
        "rounded-full border-[0.5px] border-stroke bg-white object-cover",
        className
      )}
      src={image}
      onError={() => setImage(defaultAvatar)}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          setImage(defaultAvatar);
        }
      }}
      alt={"avatar"}
      width={size}
      height={size}
    />
  );
};
