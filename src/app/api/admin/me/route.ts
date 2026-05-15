import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/cb_access_token=([^;]+)/);
    const token = tokenMatch?.[1];

    if (!token) {
      return NextResponse.json({ ok: false, error: "Nicht eingeloggt." }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (payload.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Kein Zugriff." }, { status: 403 });
    }

    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, twoFAEnabled: true, createdAt: true },
    });

    if (!user) return NextResponse.json({ ok: false, error: "User nicht gefunden." }, { status: 404 });
    return NextResponse.json({ ok: true, user });
  } catch {
    return NextResponse.json({ ok: false, error: "Token ungültig oder abgelaufen." }, { status: 401 });
  }
}
