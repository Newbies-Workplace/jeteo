"use client";

import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface EventDescriptionProps {
  description: string;
}

export const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
}) => {
  return (
    <div data-color-mode="light">
      <MDEditor.Markdown source={description} />
    </div>
  );
};
