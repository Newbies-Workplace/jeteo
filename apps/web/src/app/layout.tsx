import { Providers } from "@/providers";
import React from "react";
import "@/global.scss";
import colors from "@/colors.module.scss";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { Inter, Oswald, Lato } from "next/font/google";
import cs from "classnames";

const inter = Inter({
  variable: "--font-inter",
  preload: false,
});
const oswald = Oswald({
  variable: "--font-oswald",
  preload: false,
});
const lato = Lato({
  variable: "--font-lato",
  weight: "400",
  preload: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  dayjs.locale("pl");

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="favicon.ico" sizes="any" />

        <title>jeteo</title>
      </head>
      <body
        className={cs(inter.variable, oswald.variable, lato.variable)}
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
