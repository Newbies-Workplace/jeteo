"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ReactNode } from "react";

export const Portal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(<>{children}</>, document.getElementById("portal"))
    : null;
};
