import React from "react";

export const actionClassName =
  "flex flex-1 justify-center items-center min-h-10 py-1 px-4 gap-2.5 text-md self-stretch rounded-lg";

export const ActionsContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      className={
        "flex flex-col sm:flex-row items-start gap-2 self-stretch text-primary flex-1 justify-center"
      }
    >
      {children}
    </div>
  );
};
