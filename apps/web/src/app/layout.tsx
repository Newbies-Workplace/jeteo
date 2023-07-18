import { Providers } from "@/providers";
import React from "react";
import "@/global.css";
import colors from "@/colors.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: colors.background,
          height: "100vh",
          width: "100vw",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
