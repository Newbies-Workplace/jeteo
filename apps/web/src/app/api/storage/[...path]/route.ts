import { NextRequest, NextResponse } from "next/server";
import { getFile } from "@/app/api/storage/storage-service";

export const CONTROLLER_PREFIX = "storage/v1";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname!.replace(`/api/${CONTROLLER_PREFIX}`, "");

  if (!path || Array.isArray(path)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const fileStream = getFile(path);
    fileStream.on("error", () => {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    });

    // @ts-ignore
    return new NextResponse(fileStream);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
