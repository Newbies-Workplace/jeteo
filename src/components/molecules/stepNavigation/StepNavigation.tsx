"use client";

import React from "react";
import { Text } from "@/components/atoms/text/Text";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StepButtonProps {
  title: string;
  active: boolean;
  disabled?: boolean;
}

export const StepButton: React.FC<StepButtonProps> = ({
  title,
  active,
  disabled = false,
}) => (
  <div
    className={cn(
      "flex items-center p-2 gap-2 rounded-lg shadow-md cursor-pointer bg-surface",
      {
        "cursor-not-allowed hover:bg-surface": disabled,
        "hover:bg-background active:bg-stroke text-primary": !disabled,
      }
    )}
  >
    <span
      className={cn(`rounded-full size-6`, active ? "bg-primary" : "bg-gray")}
    />
    <Text className={active ? "text-primary" : "text-gray"} variant={"headM"}>
      {title}
    </Text>
  </div>
);

interface StepsContainerProps {
  links: {
    href: string;
    name: string;
  }[];
}

export const StepNavigation: React.FC<StepsContainerProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link href={link.href} key={link.name} replace>
            <StepButton key={link.name} active={isActive} title={link.name} />
          </Link>
        );
      })}
    </div>
  );
};
