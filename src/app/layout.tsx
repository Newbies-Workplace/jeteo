import { Providers } from "@/providers";
import React, { Suspense } from "react";
import "@/app/globals.css";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { Inter, Oswald, Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import socialpreview from "@/assets/social-preview.png";
import { GoogleAnalytics } from "@/components/organisms/analytics/GoogleAnalytics";
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

const frontendUrl = process.env["NEXT_PUBLIC_FRONTEND_URL"];

export const metadata: Metadata = {
  metadataBase: frontendUrl ? new URL(frontendUrl) : undefined,
  title: "Jeteo",
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
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} ${lato.variable}`}
    >
      <Suspense>
        <GoogleAnalytics
          measurementId={process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS"]!}
        />
      </Suspense>

      <body className={"m-0 bg-background h-screen"}>
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

        <Suspense>
          <CookieDialog />
        </Suspense>
      </body>
    </html>
  );
}
