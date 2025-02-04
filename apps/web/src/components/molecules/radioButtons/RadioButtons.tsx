"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HelpIcon from "@/assets/help.svg";
import { Text } from "@/components/atoms/text/Text";

export interface RadioItem {
  id: string;
  name: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioButtonsProps {
  values: RadioItem[];
  selectedValueIndex: number;
  onChange: (value: RadioItem) => void;
}

export const RadioButtons: React.FC<RadioButtonsProps> = ({
  values,
  selectedValueIndex,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onItemClick = (index: number, item: RadioItem) => {
    if (!item.disabled && index !== selectedValueIndex) {
      onChange(item);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      {values.map((item, index) => {
        return (
          <div
            className={`flex flex-col flex-grow justify-between items-center max-w-[150px] h-[75px] p-2 rounded-lg border ${
              selectedValueIndex === index
                ? "bg-primary text-white hover:bg-primaryHover active:bg-primaryActive"
                : item.disabled
                ? "bg-light-gray text-black hover:bg-light-gray active:bg-light-gray"
                : "bg-surface border-stroke hover:bg-light-hover active:bg-light-active"
            }`}
            onClick={() => onItemClick(index, item)}
            key={item.id}
          >
            <div className="flex justify-between w-full">
              <input
                ref={inputRef}
                type="radio"
                value={item.id}
                checked={selectedValueIndex === index}
                disabled={item.disabled}
                onChange={() => onItemClick(index, item)}
              />

              {item.description !== undefined && (
                <div className="relative inline-block">
                  <Image
                    src={HelpIcon}
                    alt="help icon"
                    width={20}
                    height={20}
                  />
                  <Text className="absolute bottom-[calc(100%+10px)] left-1/2 ml-[-60px] w-[120px] bg-black text-white text-center p-1 rounded-lg hidden group-hover:block">
                    {item.description}
                  </Text>
                  <div className="absolute top-full left-1/2 ml-[-5px] border-5 border-solid border-black border-t-transparent border-r-transparent border-b-transparent border-l-transparent"></div>
                </div>
              )}
            </div>

            <Text className="w-full overflow-hidden text-ellipsis text-end font-bold select-none">
              {item.name}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
