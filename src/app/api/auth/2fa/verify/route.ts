import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import { db } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader.match(/cb_access_token=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ ok: false, error: "Nicht eingeloggt." }, { status: 401 });

    const auth = verifyAccessToken(token);
    if (auth.role !== "ADMIN") return NextResponse.json({ ok: false, error: "Kein Zugriff." }, { status: 403 });

    const body = await req.json();
    const code = String(body?.code || "").trim();

    const user = await db.user.findUnique({ where: { id: auth.sub } });
    if (!user?.twoFASecret) return NextResponse.json({ ok: false, error: "Kein 2FA-Secret vorhanden." }, { status: 400 });

    const valid = authenticator.verify({ token: code, secret: user.twoFASecret });
    if (!valid) return NextResponse.json({ ok: false, error: "Ungültiger Code." }, { status: 401 });

    await db.user.update({
      where: { id: auth.sub },
      data: { twoFAEnabled: true },
    });

    return NextResponse.json({ ok: true, message: "2FA aktiviert." });
  } catch {
    return NextResponse.json({ ok: false, error: "2FA-Verifizierung fehlgeschlagen." }, { status: 500 });
  }
}
