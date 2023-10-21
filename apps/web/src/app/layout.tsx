import { Providers } from "@/providers";
import React from "react";
import "@/global.scss";
import colors from "@/colors.module.scss";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}
