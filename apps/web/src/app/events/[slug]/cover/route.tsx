import { ImageResponse } from "next/server";
import { getEvent } from "@/common/getEvent";
import { getEventLectures } from "@/common/getLecture";
import { notFound } from "next/navigation";
import { formatFromToDates } from "@/common/utils";
import React from "react";

export const runtime = "edge";

//todo font
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  const event = await getEvent(slug);
  const lectures = await getEventLectures(slug);

  if (!event) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 32,
          fontFamily: "Inter",
          background: "linear-gradient(104deg, #4340BE 0%, #CE2424 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 4,
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 64,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            {event.title}
          </div>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 32,
              fontFamily: "Lato",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {event.subtitle}
          </div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            display: "flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 10,
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                alignSelf: "stretch",
                gap: 16,
                width: 1220,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignSelf: "stretch",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: 38,
                    fontFamily: "Lato",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  {formatFromToDates(event.from, event.to)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignSelf: "stretch",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: 38,
                    fontFamily: "Lato",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  {event.address
                    ? `${event.address.city} ${event.address.place}`
                    : "online"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
