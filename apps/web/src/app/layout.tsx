import { Providers } from "@/providers";
import React from "react";
import "@/global.scss";
import colors from "@/colors.module.scss";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { Inter, Oswald, Lato } from "next/font/google";
import cs from "classnames";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import socialpreview from "@/assets/social-preview.png";
import { GoogleAnalytics } from "@/components/organisms/analytics/GoogleAnalytics";
import Head from "next/head";
import { CookieDialog } from "@/components/organisms/analytics/cookieDialog/CookieDialog";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env["NEXT_PUBLIC_FRONTEND_URL"]),
  openGraph: {
    title: "Jeteo",
    description: "Portal do dzielenia się wiedzą!",
    siteName: "Jeteo",
    images: [
      {
        url: socialpreview.src,
        width: 1280,
        height: 600,
        alt: "jeteo",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  dayjs.locale("pl");

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="favicon.ico" sizes="any" />

        <title>jeteo</title>
      </Head>

      <GoogleAnalytics
        measurementId={process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS"]}
      />

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
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                className: inter.className,
                duration: 3000,
                iconTheme: {
                  primary: "white",
                  secondary: "#6BBC91",
                },
                style: {
                  background: "#6BBC91",
                  color: "white",
                },
              },
              error: {
                className: inter.className,
                duration: 3000,
                iconTheme: {
                  primary: "white",
                  secondary: "#F75254",
                },
                style: {
                  background: "#F75254",
                  color: "white",
                },
              },
            }}
          />
        </Providers>

        <CookieDialog />
      </body>
    </html>
  );
}
