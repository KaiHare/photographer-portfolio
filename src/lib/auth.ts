import { NextRequest, NextResponse } from "next/server";

export function requireAdmin(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace(/Bearer\s+/i, "").trim();
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
