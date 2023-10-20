import { Providers } from "@/providers";
import React from "react";
import "@/global.scss";
import colors from "@/colors.module.scss";
import "dayjs/locale/pl";
import dayjs from "dayjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  dayjs.locale("pl");

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: colors.background,
          height: "100vh",
        }}
      >
        <Providers>
          {children}
          <div id={"portal"} />
        </Providers>
      </body>
    </html>
  );
}
