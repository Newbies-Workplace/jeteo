"use client";

import Script from "next/script";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
const env = process.env.NODE_ENV;

interface GoogleAnalyticsProps {
  measurementId: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  measurementId,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    window.gtag("config", measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId]);

  // https://web.dev/articles/vitals?hl=pl
  useReportWebVitals((metric) => {
    window.gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value
      ), // values must be integers
      event_label: metric.id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  });

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${measurementId}', {
                debug_mode: ${env === "development" ? "true" : "false"},
                page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
